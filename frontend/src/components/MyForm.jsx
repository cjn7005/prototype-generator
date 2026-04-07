import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

export function MyForm({isActive, onClosed, header, fields, obj, field_names, pk, onSubmit}) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [objPK, setObjPK] = useState(obj ? obj[pk] : null);

  useEffect(() => setObjPK(obj ? obj[pk] : null), [obj,pk]);
  useEffect(() => {setIsOpen(isActive)},[isActive]);
  
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  async function handleSubmit() {
    // Clean null values 
    // THIS COULD POTENTIALLY CAUSE ISSUES WITH DESIRED EMPTY VALUES, DELETE IF NECESSARY
    for (let kv of Object.entries(formData)) {
      if (kv[1] === "") {
        delete formData[kv[0]];
      }
    }
    
    onSubmit(formData, objPK); 
    setIsOpen(false);
  }

  return (
  <Modal isOpen={isOpen} onClosed={() => {setFormData({}); onClosed();}}>
    <ModalHeader>
      {header}
    </ModalHeader>
    <Form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
      <ModalBody>
        {fields.map((k,i) => (<>
          <FormGroup>
            <Label for={k}>{field_names[i]}</Label>
            <Input name={k} defaultValue={obj ? obj[k] : ""} onChange={(e) => handleChange(e)}/>
          </FormGroup>
        </>))}
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button type="submit" color="success">Submit</Button>
      </ModalFooter>
    </Form>
  </Modal>  
  );
}