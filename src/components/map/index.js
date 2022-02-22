/* eslint-disable jsx-a11y/anchor-is-valid */

import "./index.scss";

import React, { useRef, useState } from "react";

import ReactMapGL, { Marker } from '@goongmaps/goong-map-react';
const GOONG_MAPTILES_KEY = 'YbyyXMX1TI9TWQwWb2p9mE3G3XXpiTclJrvwhlQ3';

const FIXED_POINT = [
  {
    id: 1,
    name: "Nhà trai",
    location: "Yên Tập, Nhân Hòa, Mỹ Hào, Hưng Yên",
    latitude: 20.951629,
    longitude: 106.058693,
    code: '1',
    src: 'images/points/loki.jpg'
  }, {
    id: 2,
    name: "Nhà gái",
    location: "Chi Đoan, Cộng Hòa, Nam Sách, Hải Dương",
    latitude: 21.01493,
    longitude: 106.388990,
    code: '2',
    src: 'images/points/nieu.jpg'
  },
];

const Map = () => {
  const mapRef = useRef();
  const [viewport, setViewport] = useState({
    latitude: 20.996474,
    longitude: 106.234035,
    zoom: 9,
    bearing: 0,
    pitch: 0
  });
  const [showInfo, setShowInfo] = useState();

  const setSelectedPoint = (point) => {
    setShowInfo(point);
  }

  const settings = {
    dragPan: false,
    dragRotate: false,
    scrollZoom: false,
    touchZoom: false,
    touchRotate: false,
    keyboard: false,
    doubleClickZoom: false,
  };

  const mapEmbed = `
    <iframe src="https://www.google.com/maps/embed?pb=!1m25!1m12!1m3!1d119216.47834018533!2d106.15369785771657!3d20.971985537748356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m10!3e0!4m4!2s21.01493%2C106.388990!3m2!1d21.01493!2d106.38898999999999!4m3!3m2!1d20.951629!2d106.05869299999999!5e0!3m2!1sen!2s!4v1644307854710!5m2!1sen!2s" width="600" height="350" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
    `
  return (
    <div>
      <div className="map-box">
      
        <div dangerouslySetInnerHTML={{ __html: mapEmbed }}></div>
        <div>
          {FIXED_POINT.map((point) => (
            <p
            >
              <div className="point-box" >

                <div className="marker-circle" >
                  <img src={point.src} alt={point.code} /> &nbsp;
                  <a href={`http://maps.google.com/maps?daddr=${point.latitude},${point.longitude}`} target="_blank" rel="noreferrer">{point.name}</a> :
                  <span>{point.location}</span><br />
                </div>
              </div>
            </p>
          ))}
        </div>
        <ReactMapGL
          ref={mapRef}
          {...settings}
          {...viewport}
          width="100%"
          height="100%"
          mapStyle={'https://tiles.goong.io/assets/goong_map_web.json'}
          onViewportChange={setViewport}
          goongApiAccessToken={GOONG_MAPTILES_KEY}
          attributionControl={false}
        >
          {FIXED_POINT.map((point) => (
            <Marker
              key={`${point.latitude},${point.longitude}`}
              offsetTop={-20}
              offsetLeft={-10}
              latitude={point.latitude}
              longitude={point.longitude}
            >
              <div className="point-box" onClick={() => setSelectedPoint(point)}>
                {showInfo?.id === point.id && <div className="point-popover">
                  <strong>{point.name}</strong><br />
                  <span>{point.location}</span><br />
                  <div className="box-foot">
                    <a href={`http://maps.google.com/maps?daddr=${point.latitude},${point.longitude}`} target="_blank" rel="noreferrer" >Đi tới</a>
                  </div>
                </div>}
                <div className="marker-circle" >
                  <img src={point.src} alt={point.code} />
                </div>
              </div>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </div>

  );
}
export default React.memo(Map);
