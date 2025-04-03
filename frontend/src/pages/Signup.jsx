import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import "../styles/Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin"); // Default to "Admin" (case-sensitive to match backend enum)
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Send signup request to backend
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        role,
      });

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Navigate based on role
      switch (response.data.role) {
        case "Admin":
          navigate("/admin-panel");
          break;
        case "Teacher":
          navigate("/teacher-panel");
          break;
        case "Student":
          navigate("/student-panel");
          break;
        case "Parent":
          navigate("/parent-panel");
          break;
        default:
          alert("Signup successful! Please login.");
          navigate("/login");
      }
    } catch (error) {
      // Handle errors (e.g., user already exists, server error)
      const errorMsg = error.response?.data?.msg || "Signup failed. Please try again.";
      alert(errorMsg);
    }
  };

  return (
    <div className="signup-page">
      <h2>SIGN UP</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <label>Select Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
          <option value="Parent">Parent</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;