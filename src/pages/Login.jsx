import React, { useState } from "react";
import fakeAuthService from "../components/fakeAuthService";
import { useNavigate } from "react-router-dom";
import '../login.css'

function Login({ onLogin }) {
  // State variables for username, password, and navigation
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle the login process
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Call your authentication service/API (in this case, using a fakeAuthService)
      console.log("Attempting login with credentials:")
      const user = await fakeAuthService.login({ username, password });

      // If the login is successful, update the state and call the onLogin callback
      onLogin(user);
      console.log("Login successful. User:", user);
      
      // Navigate to the home page with user information in the state
      navigate("/home", { state: { id: user.username } })
    } catch (error) {
      // Handle authentication failure, e.g., show an error message
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="login">
      {/* Login form */}
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        {/* Input fields for username and password */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {/* Login button */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
