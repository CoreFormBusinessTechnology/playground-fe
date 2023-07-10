import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const makeRequests = () => {
    for (let index = 0; index < 10; index++) {
      axios.post(`/dev?param1=${index}`, {}, {
        headers: {
          Accept: '*/*',
        }
      });
    }
  }
  return (
    <div className="App">
      <button onClick={makeRequests}>makeRequests</button>
    </div>
  );
}

export default App;
