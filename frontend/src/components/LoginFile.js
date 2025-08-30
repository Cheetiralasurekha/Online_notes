import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

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
    <div style={{ padding: 20 }}>
      <h2>Login Page</h2>
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
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  );
}
export default Login;
