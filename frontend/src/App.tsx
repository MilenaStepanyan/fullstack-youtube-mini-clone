import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3010/api/hello')
      .then(response => setMessage(response.data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>{message ? message : 'Loading...'}</h1>
    </div>
  );
};

export default App;
