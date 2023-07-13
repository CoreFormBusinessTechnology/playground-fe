import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [count, setCount] = useState<number>(50000000);
  const makeRequest = async () => {
    try {
      await axios.get(`/api?count=${count}`, {
        timeout: 500,
        headers: {
          Accept: '*/*',
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="App">
      <div>
        <input type="number" onChange={(e) => setCount(Number(e.target.value))} value={count} />
      </div>
      <button onClick={makeRequest}>makeRequests</button>
      <p>v0.0.2</p>
    </div>
  );
}

export default App;
