import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Student");

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { username, password, email, role };
    localStorage.setItem("user", JSON.stringify(userData));

    // Optional: Send data to backend
    await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Redirect to login page or dashboard
    window.location.href = "/login";
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            {/* <option value="Admin">Admin</option> */}
          </select>
          <button className="register-button" type="submit">
            Register
          </button>
          <p>
            Already have account? <a href="/">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
