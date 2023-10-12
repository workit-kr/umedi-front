import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function modal({show, handleClose, title, message, okButton, handleOK, cancelButton}) {
  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal
        dialogClassName="modal-container"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>{message}</div>
        </Modal.Body>

        <Modal.Footer
          className="modal-footer"
        >
          {
            cancelButton && (<Button variant="secondary" size="small">{cancelButton}</Button>)
          }
          <Button variant="primary" size="small" onClick={handleOK}>{okButton}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default modal;