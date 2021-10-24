import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

const Backdrop = ({ onClick }) => {
  return <div className={classes.backdrop} onClick={onClick} />;
};

const Overlay = ({ children }) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  );
};

const bodyHTML = document.querySelector("body");

const Modal = ({ children, onClick }) => {
  return (
    <>
      {createPortal(<Backdrop onClick={onClick} />, bodyHTML)}
      {createPortal(<Overlay>{children}</Overlay>, bodyHTML)}
    </>
  );
};

export default Modal;
