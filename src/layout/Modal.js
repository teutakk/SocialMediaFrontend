import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { FaXmark } from "react-icons/fa6";
const Modal = ({
  children,
  showActionButtons,
  onModalActionHandler,
  showModal,
  modal,
  data,
}) => {
  const [updatedData, setUpdatedData] = useState();

  const modalDataChangeHandler = (updatedData) => {
    setUpdatedData(updatedData);
  };

  useEffect(() => {
    document.body.classList.add("hidden");
    return () => document.body.classList.remove("hidden");
  }, []);

  return createPortal(
    <div className={classes.Modal}>
      <div className={classes["modal-content"]}>
        <button onClick={showModal} className={classes.close}>
          <FaXmark />
        </button>
        {React.cloneElement(children, {
          post: data,
          onChangeDataHandler: modalDataChangeHandler,
        })}
        {showActionButtons && (
          <div className={classes["modal-actions"]}>
            {showActionButtons && (
              <>
                <button
                  className={classes.cancel}
                  onClick={() =>
                    onModalActionHandler({
                      action: "cancel",
                      data,
                    })
                  }
                >
                  cancel
                </button>
                <button
                  className={classes.save}
                  onClick={() =>
                    onModalActionHandler({
                      action: "save",
                      data: updatedData,
                    })
                  }
                >
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
