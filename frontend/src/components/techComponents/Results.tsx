import React from "react";

interface ResultsProps {
  results: any[];
}

export const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
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
  );
};
