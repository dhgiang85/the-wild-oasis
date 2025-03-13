import React from 'react';
import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";

function AddCabin() {

  return (
    <div>
    <Modal>
      <Modal.Open opens="add-cabin">
        <Button>Add New Cabin</Button>
      </Modal.Open>
      <Modal.Window name="add-cabin">
        <CreateCabinForm/>

      </Modal.Window>
    </Modal>
    </div>
  );
}

export default AddCabin;