import React, { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/notesListPage.css";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getNotes(token);
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleDelete = (id) => {
    deleteNote(id, localStorage.getItem("token"))
      .then(() => setNotes((prev) => prev.filter((n) => n.id !== id)))
      .catch(() => setError("Failed to delete note"));
  };

  const handleLogout = () => {
    localStorage.setItem("token",""); // clear token
    navigate("/login"); // redirect to login page
  };

  return (
   <div className="notes-page">
      {/* Header section with Notes title and Logout button */}
      <div className="notes-header">
        <h2 className="notes-title">Notes</h2>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="no-notes">No notes yet. Add one!</p>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-text">
                <b>{note.title}</b>
                <p>{note.content}</p>
              </div>
              <div className="note-actions">
                <button
                  className="styled-button edit"
                  onClick={() => navigate(`/edit/${note.id}`)}
                >
                  Edit
                </button>
                <button
                  className="styled-button delete"
                  onClick={() => handleDelete(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="add-btn-float"
        onClick={() => navigate("/add")}
        title="Add Note"
      >
        +
      </button>
    </div>
  );
}
