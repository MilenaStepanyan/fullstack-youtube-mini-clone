import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import YouTube_logo from "../../../public/YouTube_logo.png";

const API_URL = "http://localhost:3010/api/";

export const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}user/login`, {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate("/profile");
      console.log("Logged successfully", response.data);
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred");
    }
  };

  return (
    <>
    </>
  );
};
