import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const makeRequests = () => {
    for (let index = 0; index < 10; index++) {
      axios.get(`/api?count=${index}`, {
        headers: {
          Accept: '*/*',
        }
      });
    }
  }
  return (
    <div className="App">
      <button onClick={makeRequests}>makeRequests</button>
      <p>v0.0.1</p>
    </div>
  );
}

export default App;
