import Modal from "react-bootstrap/Modal";
import Item from "../Item/Item";
import "./modal.css";
function ModalDialog(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="mod"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.item.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Item item={props.item} id={props.item.id} descShow></Item>
      </Modal.Body>
    </Modal>
  );
}

export default ModalDialog;
