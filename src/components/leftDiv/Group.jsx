import React from "react";
import styles from './Group.module.css'

export default function Group({
  title,
  initialLetters,
  color,
  onClick,
  selected,
}) {
  return (
    <div className={styles.Group}
      style={{backgroundColor: selected ? "#2F2F2F2B" : "transparent" }}
      onClick={onClick}
    >
      <div style={{ backgroundColor: color}} className={styles.title}>
        <h1
          className={styles.groupInitial}
        >
          {initialLetters}
        </h1>
      </div>
      <h2 className={styles.name}>{title}</h2>
    </div>
  );
}
