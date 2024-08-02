import React, { useState } from "react";
import styles from "./ColorPicker.module.css";

const ColorPicker = ({ onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = ["#B38BFA","#FF79F2","#43E6FC","#F19576","#0047FF","#6691FF"];

  const handleClick = (color) => {
    setSelectedColor(color);
    onSelectColor(color);
  };

  return (
    <div className={styles.colorPicker}>
      {colors.map((color, index) => (
        <div
          key={index}
          className={`${styles.colorOption} ${selectedColor === color ? styles.selected : ""}`}
          style={{ backgroundColor: color }}
          onClick={() => handleClick(color)}
        />
      ))}
    </div>
  );
};

export default ColorPicker;
