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
   <>
   </>
  );
};
