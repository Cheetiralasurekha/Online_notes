import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

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
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br/>
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}
