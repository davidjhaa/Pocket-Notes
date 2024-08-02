import React from "react";
import MainPage from "../MainPage/MainPage";
import Notes from "../Notes/Notes";
import styles from "./NoteSection.module.css";

export default function NoteSection({
  showChatArea,
  selectedGroup,
  onAddNote,
  onBackButtonClick,
}) {
  return (
    <div className={styles.noteAreaMain}>
      {showChatArea ? (
        <Notes
          groupName={selectedGroup.title}
          notes={selectedGroup.notes}
          onAddNote={onAddNote}
          color={selectedGroup.color}
          backbtnclick={onBackButtonClick}
        />
      ) : (
        <MainPage />
      )}
    </div>
  );
}
