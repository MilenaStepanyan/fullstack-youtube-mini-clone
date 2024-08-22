import React, { useState } from "react";
import YouTube_logo from "../../../public/YouTube_logo.png";
import { Search } from "../techComponents/Search";
import { Link } from "react-router-dom";

export const Home:React.FC = () => {
const [results, setResults] = useState<any[]>([])
  return (
    <>
      <div className="container">
        <header className="header">
          <div className="icon-search-signin">
            <div className="youtube-icon">
              <img src={YouTube_logo} alt="" />
            </div>
            <Search setResults={setResults} />
            <Link className="linktoRegister" to="/register"><button className="auth" >Sign up</button></Link>
            
          </div>
        </header>
        <div className="leftMenu"></div>
        <div className="leftMenu"></div>
      <div className="results-container">
        <div className="results">
          {results.length > 0 && (
            <ul>
              {results.map((result, index) => (
                <li key={index}>
                  <h3>{result.title}</h3>
                  <p>{result.description}</p>
                  <video width="320" height="240" controls>
                    <source
                      src={`http://localhost:3010/uploads/${result.filename}`}
                      type={result.mimetype}
                    />
                    Your browser does not support the video tag.
                  </video>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      </div>
    </>
  );
};
