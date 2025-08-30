import { useState,useEffect} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/LoginFile";
import Signup from "./components/SignupFile";
import Notes from "./components/NotesListPage";
import EditNote from "./components/EditNote";

export default function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  // Check token AFTER first render
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setIsLoggedIn(true);
      setToken(savedToken);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setToken={setToken} />} />
            <Route path="/register" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/notes" element={<Notes token={token} />} />
            <Route path="/edit/:id" element={<EditNote token={token} />} />
            <Route path="*" element={<Navigate to="/notes" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
