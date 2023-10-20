import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
const Modal = ({ children, showActionButtons, showModal, modal, data }) => {
  useEffect(() => {
    document.body.classList.add("hidden");
    return () => document.body.classList.remove("hidden");
  }, []);

  const onCancelHandler = () => {
    console.log("cancel");
  };
  const onSaveHandler = () => {
    console.log("saved");
    showModal();
  };
  return createPortal(
    <div className={classes.Modal}>
      <div className={classes["modal-content"]}>
        <button onClick={showModal} className={classes.close}>
          X
        </button>
        {React.cloneElement(children, {
          onCancelHandler,
          post: data,
          onSaveHandler,
        })}
        {showActionButtons && (
          <div className={classes["modal-actions"]}>
            {showActionButtons && (
              <>
                <button className={classes.cancel} onClick={onCancelHandler}>
                  cancel
                </button>
                <button className={classes.save} onClick={onSaveHandler}>
                  save
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;
