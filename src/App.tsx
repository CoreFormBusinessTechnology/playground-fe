import React from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const makeRequests = () => {
    for (let index = 0; index < 10; index++) {
      axios.post(`https://dh7aht0kba.execute-api.ap-southeast-2.amazonaws.com/dev?param1=${index}`, {}, {
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
