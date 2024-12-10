import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Register.css'; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.length < 2) {
      setError("Username cannot be less than 2 characters");
      return;
    }

    if (password.length < 8) {
      setError("Password cannot be less than 8 characters");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful. Redirecting to login.");
        navigate("/login"); // Redirect to login page (replace with your method)
      } else {
         if (data.message === "User already exists") {
          setError("Username you entered is taken");
        } else {
          setError(data.message || "Error registering user");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
    <form onSubmit={handleSubmit}>
      <input
      className="register-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="register-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="register-button"type="submit">Register</button>
    </form>
    <div className="login-link">
    <Link to="/login" >
        Already registered? Click here to login
    </Link>
    </div>
    </div>
    </div>
  );
};

export default Register;
