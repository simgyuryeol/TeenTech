import React, { ReactNode } from "react";
import ReactDOM from "react-dom";


interface BackdropProps {
    onClick: () => void;
  }

const Backdrop: React.FC<BackdropProps> = (props) => {
    const handleBackdropClick = () => {
        props.onClick();
      };
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-20 bg-black bg-opacity-30" onClick={handleBackdropClick}/>
  );
};

interface ModalOverlayProps {
  children: ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = (props) => {
  return (
    <div className="fixed top-40 left-10 w-80 z-50 overflow-hidden flex items-center flex-col bg-white rounded-xl">
      {props.children}
    </div>
  );
};

interface ModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  children: ReactNode;
}

const BotModal: React.FC<ModalProps> = (props) => {
    const closeModal = () => {
        // Add your close modal logic here
        props.closeModal();
        console.log("Modal closed");
      };
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClick={closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        document.getElementById("overlay-root")!
      )}
    </React.Fragment>
  );
};

export default BotModal;
