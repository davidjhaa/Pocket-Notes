import React, { useState, useRef, useEffect } from "react";
import styles from "./Notes.module.css";
import submitBtnDisabled from "../../../assets/submit-disabled.png";
import submitBtnEnabled from "../../../assets/submit-enabled.png";
import Ellipse from "../../../assets/Ellipse.png";
import backBtn from "../../../assets/back-btn.png";

export default function Notes({
  notes,
  onAddNote,
  groupName,
  color,
  backbtnclick,
}) {
  const [newNote, setNewNote] = useState("");
  const chatAreaRef = useRef(null);

  const handleBackButtonClick = () => {
    backbtnclick();
  };

  const handleSubmit = () => {
    if (newNote.trim() !== "") {
      onAddNote(newNote);
      setNewNote("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const getInitialLetters = (name) => {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase());
    return initials.join("");
  };

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [notes]);

  return (
    <>
      <div className={styles.chatAreaMain}>
        <div className={styles.chatAreaHead}>
          <div className={styles.backButton} onClick={handleBackButtonClick}>
            <img src={backBtn} alt="Back Button" />
          </div>
          <h1 style={{ backgroundColor: color }}>
            {getInitialLetters(groupName) || "No Group Selected"}
          </h1>
          <h2>{groupName}</h2>
        </div>
        <div className={styles.chatAreaNotes} ref={chatAreaRef}>
          {notes.map((note, index) => (
            <div className={styles.chatNotes} key={index}>
              <p style={{}}>{note.content}</p>
              <div className={styles.noteDateTime}>
                <small>{note.noteDate}</small>
                <div>
                  <img src={Ellipse} alt="Ellipse Icon" />
                </div>
                <small>{note.timestamp}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chatInputArea}>
        <textarea
          placeholder="Enter your text here..........."
          autoComplete="off"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleKeyDown}
        ></textarea>
        <button onClick={handleSubmit} disabled={!newNote.trim()}>
          {newNote.trim() ? (
            <img src={submitBtnEnabled} alt="Enabled Button" style={{cursor:'pointer'}} />
          ) : (
            <img src={submitBtnDisabled} alt="Disabled Button" />
          )}
        </button>
      </div>
    </>
  );
}
