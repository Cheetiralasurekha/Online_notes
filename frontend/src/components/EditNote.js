import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../api";

export default function EditNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load this note
  useEffect(() => {
    setLoading(true);
    getNoteById(id,localStorage.getItem("token"))
      .then(res => setForm({ title: res.data.title, content: res.data.content }))
      .catch(() => setError("Note not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = () => {
    const title = form.title.trim();
    const content = form.content.trim();
    if (!title || !content) return;

    updateNote(id, { title, content }, localStorage.getItem('token'))
      .then(() => navigate("/notes"))
      .catch(() => setError("Failed to update note"));
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;
  if (error) return <div style={{ padding: 20, color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Note</h2>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={() => navigate("/notes")} style={{ marginLeft: 8 }}>
        Cancel
      </button>
    </div>
  );
}
