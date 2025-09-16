import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../api";
import "../styles/editNote.css";  // 👈 separate CSS

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getNoteById(id, localStorage.getItem("token"))
      .then((res) => setForm({ title: res.data.title, content: res.data.content }))
      .catch(() => setError("Note not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = () => {
    const title = form.title.trim();
    const content = form.content.trim();
    if (!title || !content) return;

    updateNote(id, { title, content }, localStorage.getItem("token"))
      .then(() => navigate("/notes"))
      .catch(() => setError("Failed to update note"));
  };

  if (loading) return <div className="editnote-container">Loading...</div>;
  if (error) return <div className="editnote-container" style={{ color: "red" }}>{error}</div>;

  return (
    <div className="editnote-container">
      <div className="editnote-card">
        <h2>Edit Note</h2>

        <label>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <label>Content</label>
        <textarea
          rows="4"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />

        <div className="editnote-buttons">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={() => navigate("/notes")}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
