import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        alert(data.message || "Error registering user.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
    </form>
    <div>
    <Link to="/login" >
        Already registered? Click here to Login
    </Link>
    </div>
    </div>
  );
};

export default Register;
