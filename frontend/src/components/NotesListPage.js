import axios from "axios";
import React, { useEffect, useState } from "react";
import { getNotes,createNote,deleteNote} from "../api";
import { useNavigate } from "react-router-dom";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token"); // ✅ get token from login
        const response = await getNotes(token);
        console.log(response,"lalala");
        setNotes(response.data);
        console.log(notes,"blablabla");
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);
  const handleAdd = () => {
    const title = newNote.title.trim();
    const content = newNote.content.trim();
    if (!title || !content) return;
     createNote({ title, content }, localStorage.getItem('token'))
      .then(res => {
        setNotes(prev => [...prev, res.data]);   // append saved note from server
        setNewNote({ title: "", content: "" });
      })
      .catch(() => setError("Failed to create note"));
  };
  const handleDelete = (id) => {
    deleteNote(id,localStorage.getItem("token"))
      .then(() => setNotes(prev => prev.filter(n => n.id !== id)))
      .catch(() => setError("Failed to delete note"));
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Notes</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <input
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      <div style={{ marginTop: 12 }}>
        {notes.length === 0 ? (
          <p>No notes yet. Add one!</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              style={{
                background: "lightyellow",
                padding: 10,
                margin: "10px 0",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                gap: 8
              }}
            >
              <div style={{ flex: 1 }}>
                <b>{note.title}</b>: {note.content}
              </div>
              <button onClick={() => navigate(`/edit/${note.id}`)}>Edit</button>
              <button onClick={() => handleDelete(note.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
