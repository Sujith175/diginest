import React, { useContext, useState } from "react";
import { MediaContext } from "../Context/MediaContext";
import { IoIosWarning } from "react-icons/io";

const DeleteModal = ({ handleDeleteToggle, selectedItem }) => {
  const { dispatch } = useContext(MediaContext);

  const handleDelete = () => {
    dispatch({
      type: "REMOVE_MEDIA",
      id: selectedItem.id,
    });
    handleDeleteToggle();
  };

  return (
    <div className="modal-overlay" onClick={handleDeleteToggle}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleDeleteToggle}>
          &times;
        </button>
        <h2>DELETE MEDIA</h2>
        <div className="media-info">
          <IoIosWarning color="orange" size={80} className="warning-icon" />
          Are you Sure you want to delete the following Media ?
          <button className="delete-btn" onClick={handleDelete}>
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
