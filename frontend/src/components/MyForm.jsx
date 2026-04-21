import PropTypes from 'prop-types';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

export function MyForm({isActive, onClosed, header, fields, obj, field_names, pk, onSubmit, required}) {
  MyForm.propTypes = {
    isActive: PropTypes.bool.isRequired,
    onClosed: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    obj: PropTypes.object,
    field_names: PropTypes.array.isRequired,
    pk: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    required: PropTypes.array
  }

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
    let formCopy = {...formData};
    for (let kv of Object.entries(formCopy)) {
      if (kv[1] === "") {
        delete formCopy[kv[0]];
      }
    }
    setFormData(formCopy);

    onSubmit(formCopy, objPK); 
    setIsOpen(false);
  }

  return (
  <Modal isOpen={isOpen} onClosed={() => {setFormData({}); onClosed();}}>
    <ModalHeader>
      {header}
    </ModalHeader>
    <Form onSubmit={(e) => {e.preventDefault(); handleSubmit();}}>
      <ModalBody>
        {fields.map((k,i) => (
          <FormGroup key={"formGroup"+i}>
            <Label aria-required={required?.includes(k)} for={k}>
              {field_names[i]}{required?.includes(k) ? <span className="text-danger"> *</span> : ""}
            </Label>
            <Input required={required?.includes(k)} name={k} defaultValue={obj ? obj[k] : ""} onChange={(e) => handleChange(e)}/>
          </FormGroup>
        ))}
      </ModalBody>
      <ModalFooter>
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button type="submit" color="success">Submit</Button>
      </ModalFooter>
    </Form>
  </Modal>  
  );
}