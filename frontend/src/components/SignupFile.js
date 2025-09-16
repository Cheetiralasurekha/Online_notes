import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import "../styles/signUpFile.css"

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if(password.length <8){
      alert("Password must be atleast 8 characters long");
      return;
    }
    registerUser({ username, password })
      .then(() => {
        alert("Registration successful! Please login.");
        navigate("/login");
      })
      .catch(() => alert("Failed to register. Try another username."));
  };
    return (
   <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>

        <div className="form-group">
          <input
            type="text"
            value={username}
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="register-btn" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
    </div>

  );

}
