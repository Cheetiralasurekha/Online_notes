import axios from "axios";

const NOTES_URL = "http://localhost:9090/notes";
const AUTH_URL = "http://localhost:9091/auth";

// ---- NOTES ----

// Get all notes of logged-in user
export const getNotes = (token) => {
    const userId = localStorage.getItem("userId");
    return axios.get(`${NOTES_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

// Get a note by noteId
export const getNoteById = (id, token) =>
  axios.get(`${NOTES_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Create a new note (with userId)
export const createNote = (note, token) => {
    const userId = localStorage.getItem("userId");
    return axios.post(
        NOTES_URL,
        { ...note, userId: userId },
        { headers: { Authorization: `Bearer ${token}` } }
    );
}

// Update note by noteId
export const updateNote = (id, note, token) =>
  axios.put(`${NOTES_URL}/${id}`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Delete note by noteId
export const deleteNote = (id, token) =>
  axios.delete(`${NOTES_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

// ---- AUTH ----

// Register new user
export const registerUser = (user) =>
  axios.post(`${AUTH_URL}/register`, user);

// Login user (and save token + userId in frontend after success)
export const loginUser = (user) =>
  axios.post(`${AUTH_URL}/login`, user);
