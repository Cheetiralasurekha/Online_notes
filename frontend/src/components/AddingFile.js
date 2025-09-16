import React, { useState } from "react";
import { createNote } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/addingFile.css";

export default function AddNotePage() {
  const [note, setNote] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleSave = () => {
    if (!note.title.trim() || !note.content.trim()) return;
    createNote(note, localStorage.getItem("token"))
      .then(() => navigate("/notes"))
      .catch(() => alert("Failed to save note"));
  };

  return (
    <div className="add-note-container">
      <div className="add-note-card">
        <input
          className="title-input"
          placeholder="Title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
        />
        <textarea
          className="content-input"
          placeholder="Take a note..."
          value={note.content}
          onChange={(e) => setNote({ ...note, content: e.target.value })}
        />
        <button className="styled-button save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
