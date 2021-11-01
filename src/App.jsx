import "./App.scss";
import React from 'react';
import Album from './components/album';
import Map from './components/map'
import Info from './components/info'
import { useRef, useState } from 'react';


function App() {
  const fullPage = useRef();
  const [page, setPage] = useState(0);
  const onScroll = (e) => {
    const scrollTop = fullPage.current.scrollTop;
    const height = 500;
    const newPage = Math.floor(scrollTop /height);
    if (newPage !== page) {
      setPage(newPage);
    }
  }
  return (
    <div className="App" ref={fullPage} onScroll={onScroll}>
      <div className="left-panel">
        <div className="menu">
          <div className="menu-btn">
            <img alt="menu" src="https://img.icons8.com/color/48/ffffff/circled-menu.png" />
          </div>
          <div className="menu-panel">
            <div className="item">
              <img alt="album" src="https://img.icons8.com/color/48/ffffff/google-photos-new.png" />
              <span>Album ảnh</span>
            </div>
            <div className="item">
              <img alt="calendar" src="https://img.icons8.com/color/48/ffffff/google-calendar--v1.png" />
              <span>Lịch trình</span>
            </div>
            <div className="item">
              <img alt="map" src="https://img.icons8.com/color/48/ffffff/google-maps.png" />
              <span>Địa chỉ</span>
            </div>
            <div className="item">
              <img alt="contact" src="https://img.icons8.com/color/48/ffffff/apple-phone.png" />
              <span>Liên hệ</span>
            </div>

          </div>
        </div>
        <Info page={page} />

      </div>
      <div className={`right-panel`} >
        <div className="element page1">
          page0
        </div>
        <div className="element ">
          <div className="block-tile">Địa chỉ  </div>
          <Map />
        </div>
        <div className="element">
          <div className="block-tile">Lịch trình</div>
        </div>
        <div className="element ">
          <div className="block-tile">  Liên hệ</div>

        </div>
        <div className="element">
          <div className="block-tile">Album ảnh</div>
          <Album/>
        </div>
        <div className="element">

        </div>

      </div>
    </div>
  );
}

export default App;
