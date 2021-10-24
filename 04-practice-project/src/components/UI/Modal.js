import Button from "./Button";
import Card from "./Card";
import ReactDOM from "react-dom";
import { modal, header, content, actions, backdrop } from "./Modal.module.css";

const Backdrop = ({ errorHandler }) => (
  <div className={backdrop} onClick={errorHandler} />
);

const Overlay = ({ title, message, errorHandler }) => (
  <Card className={modal}>
    <header className={header}>
      <h2>{title}</h2>
    </header>
    <div className={content}>{message}</div>
    <footer className={actions}>
      <Button onClick={errorHandler}>Okay</Button>
    </footer>
  </Card>
);

const Modal = ({ title, message, errorHandler }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop errorHandler={errorHandler} />,
        document.querySelector("body")
      )}
      {ReactDOM.createPortal(
        <Overlay errorHandler={errorHandler} title={title} message={message} />,
        document.querySelector("body")
      )}
    </>
  );
};

export default Modal;
