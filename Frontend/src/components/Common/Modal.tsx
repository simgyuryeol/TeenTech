import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

const Backdrop: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black bg-opacity-60" />
  );
};

interface ModalOverlayProps {
  children: ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <div className="fixed top-30vh left-10 w-80 z-50 overflow-hidden flex items-center flex-col bg-white rounded">
      {props.children}
    </div>
  );
};

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default Modal;
