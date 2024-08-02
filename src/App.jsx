import React, { useState, useEffect, useRef } from "react";
import styles from "./App.module.css";
import GroupList from "./components/leftDiv/GroupList";
import NoteSection from "./components/RightDiv/NoteSection/NoteSection";
import CreateGroup from "./components/RightDiv/createGroup/CreateGroup";

export default function App() {
  const hasLoadedLocalStorage = useRef(false);

  const [showChatArea, setShowChatArea] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState([]);
  const [showAddGroupForm, setShowAddGroupForm] = useState(false);

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem("groups")) || [];
    if (!hasLoadedLocalStorage.current) {
      setGroups(storedGroups);
      hasLoadedLocalStorage.current = true;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const handleAddGroup = (newGroupName, color) => {
    setGroups((prevGroups) => {
      const newGroup = {
        id: prevGroups.length + 1,
        title: newGroupName,
        notes: [],
        color: color,
      };
      return [...prevGroups, newGroup];
    });
    setShowAddGroupForm(false);
  };

  const handleDeleteGroup = (groupId) => {
    setGroups((prevGroups) =>
      prevGroups.filter((group) => group.id !== groupId)
    );
  };

  const handleBackButtonClick = () => {
    setShowNoteArea(false);
  };

  const [showNoteArea, setShowNoteArea] = useState(false);

  const handleGroupClick = (group) => {
    setShowChatArea(true);
    setSelectedGroup(group);
    setShowNoteArea(true);
  };

  const handleAddNote = (newNote) => {
    if (selectedGroup) {
      const currentDate = new Date();

      const optionsTime = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };

      const day = currentDate.toLocaleString("en-US", { day: "numeric" });
      const month = currentDate.toLocaleString("en-US", { month: "long" });
      const year = currentDate.toLocaleString("en-US", { year: "numeric" });
      const formattedDate = `${day} ${month} ${year}`;
      const formattedTime = currentDate.toLocaleString("en-US", optionsTime);

      const updatedGroup = {
        ...selectedGroup,
        notes: [
          ...selectedGroup.notes,
          {
            content: newNote,
            noteDate: formattedDate,
            timestamp: formattedTime,
          },
        ],
      };
      setSelectedGroup(updatedGroup);
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.id === selectedGroup.id ? updatedGroup : group
        )
      );
    }
  };

  const handleAddGroupClick = () => {
    setShowAddGroupForm(true);
  };

  const handleAddGroupFormClose = () => {
    setShowAddGroupForm(false);
  };

  return (
    <div className={`${styles.mainContainer} ${showNoteArea ? styles.noteAreaShown : ""}`}>
      <div className={`${styles.groupArea} ${showNoteArea ? styles.groupAreaHidden : ""}`}>
        <GroupList
          groups={groups}
          onGroupClick={handleGroupClick}
          onDeleteGroup={handleDeleteGroup}
          selectedGroupId={selectedGroup ? selectedGroup.id : null}
        />
        <div className={styles.addGroupBtn} onClick={handleAddGroupClick}>
          +
        </div>
      </div>
      <div className={`${styles.notesArea} ${showNoteArea ? styles.notesAreaShown : ""}`}>
        <NoteSection
          groups={groups}
          showChatArea={showChatArea}
          selectedGroup={selectedGroup}
          onAddNote={handleAddNote}
          onBackButtonClick={handleBackButtonClick}
        />
      </div>
      {showAddGroupForm && (
        <CreateGroup
          onAddGroup={handleAddGroup}
          onClose={handleAddGroupFormClose}
        />
      )}
    </div>
  );
}