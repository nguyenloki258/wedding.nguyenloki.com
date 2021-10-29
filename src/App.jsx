import "./App.css";
import React from 'react';
import Album from './components/album';
import Map from './components/map'

function App() {
  return (
    <div className="App">
      {/* <Map /> */}
      <Album cover={true} />
    </div>
  );
}

export default App;
