import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";
import { FaXmark } from "react-icons/fa6";
import UserChip from "../components/UserChip";

/**
 * Modal component.
 *
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - Child elements to be rendered within the modal.
 * @param {boolean} props.showActionButtons - Indicates whether to show action buttons.
 * @param {function} props.onModalActionHandler - Function to handle modal actions.
 * @param {boolean} props.showModal - Function that toggles setShowModal from the component called.
 * @param {React.ReactNode} props.modal - Modal content.
 * @param {object} props.data - Additional data or properties.
 * @param {string} props.type - The type of the modal ("EDIT", "SHOW-IMAGE", "SINGLE-POST").
 *
 * @returns {JSX.Element} Modal component.
 */

const Modal = ({
  children,
  showActionButtons,
  onModalActionHandler,
  showModal,
  data,
  type,
}) => {
  const [updatedData, setUpdatedData] = useState();
  // const loggedInUser = useSelector(selectUser);
  const modalDataChangeHandler = (updatedData) => {
    console.log("running");
    setUpdatedData(updatedData);
    console.log("updated DAta: ", updatedData);
  };

  useEffect(() => {
    document.body.classList.add("hidden");
    return () => document.body.classList.remove("hidden");
  }, []);

  let modalClass;

  if (type === "EDIT") {
    modalClass = "edit";
  } else if (type === "SHOW-FULL-POST") {
    modalClass = "show-post";
  }

  const [saveButtonDisabled, setSaveButtonDisabled] = useState(true);

  useEffect(() => {
    // Check if any changes are made
    const isDescriptionChanged = data.description !== updatedData?.description;
    const isPicturesChanged =
      JSON.stringify(data.pictures) !== JSON.stringify(updatedData?.pictures);

    // Enable the save button if changes are made
    setSaveButtonDisabled(!(isDescriptionChanged || isPicturesChanged));
  }, [data, updatedData]);

  return createPortal(
    <div className={classes.Modal}>
      <div
        className={`${classes[`modal-content-${modalClass}`]} ${
          data.pictures.length > 0 ? "" : classes["modal-content-edit-no-img"]
        }`}
      >
        <div className={classes["modal-header"]}>
          <div className={classes["modal-header-user-holder"]}>
            {type === "EDIT" && (
              <>
                <UserChip heigth={35} width={35} />
                <p>{data.author}</p>
              </>
            )}
          </div>
          <h3 className={classes.title}>
            {type === "EDIT" ? "Edit post" : ""}
          </h3>
          <button onClick={showModal} className={classes.close}>
            <FaXmark />
          </button>
        </div>
        <div className={classes["modal-main"]}>
          {React.cloneElement(children, {
            post: data,
            type: type,
            onChangeDataHandler: modalDataChangeHandler,
          })}
        </div>
        {showActionButtons && (
          <div className={classes["modal-actions"]}>
            {showActionButtons && (
              <>
                <button
                  disabled={saveButtonDisabled}
                  className={classes.save}
                  onClick={() =>
                    onModalActionHandler({
                      action: "save",
                      data: updatedData,
                    })
                  }
                >
                  save changes
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
