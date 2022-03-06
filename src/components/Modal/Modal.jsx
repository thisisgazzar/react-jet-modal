import React, { useState, useEffect, useCallback } from "react";
import ReactDom from "react-dom";
import '../../styles.css';

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
};

const OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
};

function randomIdGenerator() {
  return Math.random().toString(36).replace("0.", "modal-");
}
let randomId = randomIdGenerator();

export const Modal = ({
  children,
  open,
  id = randomId,
  overlayClassName = '',
  modalClassName = '',
  modalAnimateClassName = '',
  onClose,
  closeOnOuterClick = true,
  closeOnEsc = true,
  overlayBackgroundColor = "rgba(0, 0, 0, 0.7)",
  modalBackground = "rgb(255,255, 255)",
  modalBorderRadius = "5px",
}) => {
  const [beforeClose, setBeforeClose] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [closingNow, setClosingNow] = useState(false);

  useEffect(() => {
    let el = document.createElement("div");
    el.setAttribute("id", id);
    document.body.appendChild(el);
  }, []);

  const handleEsc = useCallback((event) => {
    const { keyCode } = event;
    if (keyCode === 27) {
      onClose();
    }
  }, []);

  useEffect(() => {
    if(closeOnEsc){
      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [handleEsc]);

  useEffect(() => {
    if(open && !beforeClose) {
      setOpenModal(true);
      setBeforeClose(true);
    }
    else if(!open && beforeClose && modalAnimateClassName){
      setClosingNow(true);
      const timer = setTimeout(() => {
        setOpenModal(false);
        setBeforeClose(false);
        setClosingNow(false);
      }, 250);
      return () => clearTimeout(timer);
    }
    else if(!open && !modalAnimateClassName){
      setOpenModal(false);
      setBeforeClose(false);
    }
  }, [open, setBeforeClose, openModal]);


  const closeModalHandler = () => {
    setOpenModal(false);
    setBeforeClose(false);
    setClosingNow(false);
    onClose();
  }  

  if (openModal) return ReactDom.createPortal(
    <>
      <div
        style={{ ...OVERLAY_STYLES, backgroundColor: overlayBackgroundColor }}
        onClick={closeOnOuterClick ? () => closeModalHandler() : false}
        className={`${overlayClassName}`}
      />
      <div
        style={{
          ...MODAL_STYLES,
          backgroundColor: modalBackground,
          borderRadius: modalBorderRadius,
        }}
        className={`${modalClassName} ${!closingNow ? modalAnimateClassName : ''} ${closingNow ? modalAnimateClassName+'-closing' : ''}`}
      >
        {children}
      </div>
    </>,
    document.getElementById(id)
  );
  else return null;
};