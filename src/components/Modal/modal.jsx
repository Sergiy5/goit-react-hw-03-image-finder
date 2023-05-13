import { Component } from "react";
import { Overlay, Modal } from "./modal.styled";

class ModalWindow extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
   
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
   
  }
  handleKeyDown = (e) => {
    if (e.code === 'Escape') {
  this.props.onClose();
}
  }
  handleKlickOwerlay = (e) => {
    if (e.target.tagName !== 'IMG') {
      this.props.onClose();
    }
  }
  render() {
  return (
    <Overlay className="overlay" onClick={this.handleKlickOwerlay}>
      <Modal className="modal">{this.props.children}</Modal>
    </Overlay>
  );
  }
};

export default ModalWindow;
