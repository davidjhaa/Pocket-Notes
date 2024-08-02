import React from "react";
import Group from "./Group";
import styles from "./GroupList.module.css";

export default function GroupList({
  groups,
  onGroupClick,
  selectedGroupId,
}) {
  const handleClick = (group) => {
    onGroupClick(group);
  };

  return (
    <>
      <div className={styles.headerName}>
        <h1>Pocket Notes</h1>
      </div>
      <div className={styles.listContainer}>
        {groups.map((group) => (
          <div key={group.id}
            className={styles.gp} 
          >
            <Group
              title={group.title}
              initialLetters={getInitialLetters(group.title)}
              color={group.color}
              onClick={() => handleClick(group)}
              selected={selectedGroupId === group.id}
            />
          </div>
        ))}
      </div>
    </>
  );
}

function getInitialLetters(title) {
  const words = title.split(" ");
  const initials = words.map((word) => word.charAt(0).toUpperCase());
  return initials.slice(0, 2).join("");
}
