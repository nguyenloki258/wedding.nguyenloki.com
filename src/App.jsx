import "./App.scss";
import React from 'react';
import Album from './components/album';
import Map from './components/map'
import Info from './components/info'

function App() {
  const onScroll = ()=> {

  }
  return (
    <div className="App">
      <div className="left-panel">
        <Info/>
      </div>
      <div className="right-panel" onScroll={onScroll}>

      </div>
    </div>
  );
}

export default App;
