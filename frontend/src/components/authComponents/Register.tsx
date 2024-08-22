import React, { useState } from "react";
import axios from "axios";
import YouTube_logo from "../../../public/YouTube_logo.png";
import { Link, useNavigate } from "react-router-dom";
const API_URL = "http://localhost:3010/api/";

export const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}user/register`, {
        username,
        email,
        password,
      });
      navigate("/login")
      console.log("User Registerred", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };
  return (
    <div className="register-container">
      <div className="main">
        <img className="logo-register" src={YouTube_logo} alt="" />
        <p className="formore">Sign up to be able to upload<br/> videos etc. </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn">
          <button type="submit">Register</button>
          <Link className="signin" to={"/login"}><p>Sign in</p></Link>
        </div>
         
      </form>
      </div>
      
    </div>
  );
};
