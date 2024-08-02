import React, { useState } from "react";
import styles from "./CreateGroup.module.css";
import ColorPicker from "../colour/ColorPicker"; 

const CreateGroup = ({ onAddGroup, onClose }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#ff5733");

  const handleSubmit = () => {
    if (groupName.trim() !== "") {
      onAddGroup(groupName, selectedColor); 
      setGroupName("");
      setSelectedColor("#ff5733"); 
      onClose();
    }
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains(styles.modalContainer)) {
      onClose();
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className={styles.modalContainer} onClick={handleCloseModal}>
      <div className={styles.modalContent}>
        <p>Create New Group</p>
        <div className={styles.groupNameInput}>
          <p>Group Name</p>
          <input
            type="text"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className={styles.colorNameInput}>
          <p>Choose Colour</p>
          <ColorPicker onSelectColor={handleColorSelect} />
        </div>
        <div className={styles.groupCreateBtn}>
          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
