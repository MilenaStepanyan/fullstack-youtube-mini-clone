import React, { useEffect, useState } from "react";
import YouTube_logo from "../../../public/YouTube_logo.png";
import axios from "axios";
import { Search } from "../techComponents/Search";
import { Results } from "../techComponents/Results";
import Comments from "../techComponents/Comments"; 

const API_URL = "http://localhost:3010/api/";

export const Profile: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const [results, setResults] = useState<any[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userIdFromToken = getUserIdFromToken(token);
      setUserId(userIdFromToken);
    }
  }, []);

  const getUserIdFromToken = (token: string) => {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    const parsedData = JSON.parse(decodedPayload);
    return parsedData.userId;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setUploadError("Unable to retrieve user ID from token.");
      return;
    }

    if (!selectedFile) {
      setUploadError("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("video", selectedFile);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("userId", userId);

      const token = localStorage.getItem("token");
      const response = await axios.post(`${API_URL}video/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Video uploaded successfully:", response.data);
      setUploadSuccess("Video uploaded successfully!");
      setUploadError(null);
    } catch (error) {
      console.error("Error uploading video:", error);
      setUploadError("Failed to upload video.");
    }
  };

  const handleVideoSelect = (videoId: number) => {
    setSelectedVideoId(videoId);
  };

  return (
    <>
      <div className="container">
        <header className="header">
          <div className="icon-search-signin">
            <div className="youtube-icon">
              <img src={YouTube_logo} alt="YouTube Logo" />
            </div>
            <Search setResults={setResults} />
          </div>
        </header>

        <div className="leftMenu"></div>
        <div className="main-content">
          <div className="upload-section">
            <form onSubmit={handleUpload}>
              <input
                type="file"
                onChange={handleFileChange}
                accept="video/*"
              />
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit">Upload Video</button>
              {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
              {uploadSuccess && <p style={{ color: "green" }}>{uploadSuccess}</p>}
            </form>
          </div>

          <div className="results-container">
            <Results results={results} onVideoSelect={handleVideoSelect} />
          </div>

          {selectedVideoId && <Comments videoId={selectedVideoId} />}
        </div>
      </div>
    </>
  );
};
