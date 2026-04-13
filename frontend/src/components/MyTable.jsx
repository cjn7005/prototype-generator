import '../App.css';
import { Alert, Button, Modal, ModalFooter, ModalHeader, Table } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { MyForm } from '../components/MyForm';


export function MyTable({table_name, url, columns, column_names, pk}) {
  const [state, setState] = useState("loading");
  const [data, setData] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [posting, setPosting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [requiredFields, setRequiredFields] = useState(null);


  async function getRequiredFields() {
    let response;
    try {
      response = await fetch(url+"/admin/required", { credentials: "include" });
      let dat = await response.json()
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
      }
      
      setRequiredFields(dat);
    } catch (error) {
      console.error(error);
    }
    finally {
      let ok = response && response.ok;
      if (!ok) {
        let msg = ("Failed to get "+table_name[1] + 
                    (response ? ("\nError: "+(await response.text())) : ""));
        setLastResponse( { "text": msg, "ok": ok });
      }
    }
  }

  async function getData() {
    let response;
    try {
      setState("loading");
      response = await fetch(url, { credentials: "include" });
      let dat = await response.json()
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
      }
      
      setData(dat);
      setState("loaded");
    } catch (error) {
      console.error(error);
    }
    finally {
      let ok = response && response.ok;
      if (!ok) {
        let msg = ("Failed to get "+table_name[1] + 
                    (response ? ("\nError: "+(await response.text())) : ""));
        setLastResponse( { "text": msg, "ok": ok });
      }
    }
    getRequiredFields();
  }

  async function postData(obj) {
    let response;
    try {      
      response = await fetch(url, { credentials: "include", method: "POST", body: JSON.stringify(obj), headers:{"Content-Type":"application/json"}});
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      let ok = response && response.ok;
      let msg = ok ? ("Successfully created "+table_name[0]) : 
                     ("Failed to create "+table_name[0] + 
                        (response ? ("\nError: "+(await response.text())) : ""));
      setLastResponse( { "text": msg, "ok": ok });
      getData();
    }
  }

  async function putData(obj, objPK) {
    let response;
    try {
      let putUrl = url+objPK+"?"+Object.entries(obj).map(
        (kv,i,arr) => kv[0]+"="+kv[1] + (i < arr.length-1 ? "&" : ""));
      response = await fetch(putUrl, { credentials: "include", method: "PUT" });
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      console.log(response);
      let ok = response && response.ok;
      let msg = ok ? ("Successfully updated "+table_name[0]+" "+selectedObject[pk]) : 
                     ("Failed to update "+table_name[0]+" "+selectedObject[pk] + 
                        (response ? ("\nError: "+(await response.text())) : ""));
      setLastResponse( { "text": msg, "ok": ok });
      getData();
    }
  }

  async function deleteData(obj) {
    let response;
    try {
      response = await fetch(url + obj[pk], { credentials: "include", method: "DELETE"});
      if (!response.ok) {
        console.error(`Response status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      let ok = response && response.ok;
      let msg = ok ? ("Successfully deleted "+table_name[0]+" "+selectedObject[pk]) : 
                     ("Failed to delete "+table_name[0]+" "+selectedObject[pk] + 
                        (response ? ("\nError: "+(await response.text())) : ""));
      setLastResponse( { "text": msg, "ok": ok });
      getData();
    }
  }

  // eslint-disable-next-line
  useEffect(() => getData, []);


  if (state !== "loading") {
    console.log(lastResponse);
    return (<>
      {/* Error */}
      {lastResponse && <Alert 
        color={lastResponse.ok ? "success" : "danger"} 
        isOpen={lastResponse.text !== ""}
        toggle={() => setLastResponse(null)}
        >
        {lastResponse.text}
      </Alert>}

      {/* Post / Put Modal */}
      <MyForm 
        isActive={(posting || selectedObject) && !deleting} 
        onClosed={() => {setSelectedObject(null); setPosting(false);}} 
        header={posting ? "Create a new " + table_name[0] : 
                  "Edit "+table_name[0]+" "+(selectedObject?selectedObject[pk]:"NULL")} 
        fields={columns} 
        obj={selectedObject} 
        field_names={column_names}
        pk={pk}
        onSubmit={(obj, objPK) => {(posting ? postData(obj) : putData(obj, objPK)); setPosting(false); setDeleting(false); setSelectedObject(null);}}
        required={requiredFields}
        />

      {/* Delete Modal */}
      <Modal isOpen={deleting} onClosed={() => {setSelectedObject(null); setDeleting(false);}}>
        <ModalHeader>Delete {table_name[0]} {(selectedObject?selectedObject[pk]:"NULL")}?</ModalHeader>
        <ModalFooter>
          <Button onClick={() => {setDeleting(false); setSelectedObject(null);}}>Cancel</Button>
          <Button onClick={() => { deleteData(selectedObject);setDeleting(false); setSelectedObject(null);}}
            color="danger">Delete</Button>
          </ModalFooter>
      </Modal>


      <Table hover striped>
        <thead>
          <tr>
            <><th>{column_names[columns.indexOf(pk)]}</th></>
            {columns.map((k, i) => k === pk ? (<></>) : (<><td>{column_names[i]}</td></>))}
            <td><Button color="success" onClick={() => setPosting(true)}>Create {table_name[0]}</Button></td>
          </tr>
        </thead>
        <tbody>
          {data.map((obj) => (<><tr onClick={() => setSelectedObject(obj)}>
            <><th>{obj[pk]}</th></>
            {columns.map((k) => k === pk ? ("") : (<><td>{obj[k]}</td></>))}
            <td>
              <Button onClick={() => {setDeleting(true); setSelectedObject(obj);}} 
                color="danger">Delete</Button></td>
          </tr></>))}
        </tbody>
      </Table>
    </>);

  } else if (state === "loading") {
    return <>
      <h1>Loading...</h1>
    </>

  } else if (state === "error") {
    return <>
      {(<h1>An error occured</h1>) && getData()}
    </>
  }

}