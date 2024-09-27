import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import './Login.css'

const Login = () => {
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Log inputs for debugging
    console.log("Entered Gmail:", gmail);
    console.log("Entered Password:", password);

    // Use Vite's import.meta.env for environment variables
    if (
      gmail === import.meta.env.VITE_ADMIN_GMAIL &&
      password === import.meta.env.VITE_ADMIN_PASSWORD
    ) {
      console.log("Admin credentials match!");

      // Admin login successful, store admin data in local storage
      const adminData = { email: gmail, role: "Admin" };
      localStorage.setItem("user", JSON.stringify(adminData));
      login(gmail, password);

      console.log("Navigating to admin dashboard...");
      // Fix: Use navigate with a delay to ensure proper redirect
      setTimeout(() => {
        navigate("/admin-dashboard");
      }, 0);
    } else {
      try {
        console.log("Fetching users from backend...");
        // Fetch users from the endpoint
        const response = await fetch("http://localhost:8000/users");
        const users = await response.json();
        console.log("Users fetched:", users);

        // Find user by email
        const foundUser = users.find(
          (user) => user.email === gmail && user.password === password 
        );

        if (foundUser) {
          console.log("User found:", foundUser);

          // Store user data in local storage
          localStorage.setItem("user", JSON.stringify(foundUser));

          // Use the login function from AuthContext to set the user
          login(gmail, password);

          // Redirect based on user role
          if (foundUser.role === "Student") {
            console.log("Navigating to student dashboard...");
            navigate("/student-dashboard");
          } else if (foundUser.role === "Teacher") {
            console.log("Navigating to teacher dashboard...");
            navigate("/teacher-dashboard");
          }
        } else {
          console.log("No user found with the given Gmail and password.");
          setError("Invalid Gmail or password");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to login. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Gmail"
            value={gmail}
            onChange={(e) => setGmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="button-submit" type="submit">Login</button>
        </form>
        <p>
          New User? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
