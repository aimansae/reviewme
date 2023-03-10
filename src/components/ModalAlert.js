import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
/*
This component is for displaying a modal alert dialog to the user when a delete operation is about to occur. The show prop is to control whether the alert is visible. The
onConfirm and handleClose callbacs are passed in to determine what happens when the user presses the Delete button and the Close button.
*/
function ModalAlert({show,  handleClose, onConfirm, title, message}) {
  return (
    <Modal show={show} onHide={handleClose} onClose={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
      {message}
      </p>
      </Modal.Body>
    <Modal.Footer>
      <Button  onClick={handleClose}>
        Close
      </Button>
      <Button  nClick={onConfirm}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalAlert