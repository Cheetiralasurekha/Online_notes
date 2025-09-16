import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import "../styles/loginFile.css";

export function Login({ setIsLoggedIn, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    loginUser({ username, password })
      .then(res => {
        console.log(res, "response");
        const token = res.data.token; // backend returns token
        localStorage.setItem("token", token);
        localStorage.setItem("userId", res.data.userId);
        setToken(token);
        setIsLoggedIn(true);
        navigate("/notes");
      })
      .catch(() => alert("Invalid username or password"));
  };
   return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
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

        <button className="login-btn" onClick={handleLogin}>Login</button>
        <p className="login-footer">
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
}
export default Login;
