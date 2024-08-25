import React from "react";

interface Result {
  id: number;
  title: string;
  description: string;
  filename: string;
  mimetype: string;
}

interface ResultsProps {
  results: Result[];
  onVideoSelect: (videoId: number) => void; 
}

export const Results: React.FC<ResultsProps> = ({ results, onVideoSelect }) => {
  return (
    <div className="results">
      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li key={result.id} onClick={() => onVideoSelect(result.id)}>
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
