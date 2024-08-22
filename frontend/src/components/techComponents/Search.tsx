import React, { useState } from "react";
import axios from "axios";
import searchIcon from "../../../public/search.png";

interface SearchProps {
  setResults: React.Dispatch<React.SetStateAction<any[]>>;
}

export const Search: React.FC<SearchProps> = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:3010/api/video/getVideos", {
        params: { search: searchTerm },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  };

  return (
    <div className="search-div">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <img src={searchIcon} alt="Search" />
        </button>
      </form>
    </div>
  );
};
