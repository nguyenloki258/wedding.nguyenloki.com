import './index.scss';

import React, { useState } from 'react';

import { FullscreenControl, GeolocateControl, NavigationControl, ScaleControl, Layer } from '@goongmaps/goong-map-react';


function ControlPanel(props) {

  const [view3d, setView3d] = useState(false);

  return (
    <>
      <FullscreenControl
        label="Xem toàn màn hình"
        className="control-fullscreen" />
      <GeolocateControl
        label="Vị trí của tôi"
        disabledLabel="Vị trí của bạn không xác định được"
        className="control-location" />
      <NavigationControl
        showCompass={true}
        visualizePitch={false}
        zoomInLabel="Phóng to"
        zoomOutLabel="Thu nhỏ"
        compassLabel="Thay đổi góc nhìn"
        capturePointerMove={true}
        className="control-navigation" />
      <ScaleControl className='control-scale' />
      {/* 3D buliding */}
      <button className="mapboxgl-ctrl-icon icon-3d" onClick={() => setView3d(!view3d)}>
        <label>{view3d ? '2D' : '3D'}</label>
      </button>

      {view3d && <Layer  {
        ...{
          'id': 'building',
          'source': 'composite',
          'source-layer': 'VN_Building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        }
      } />}
    </>
  );
}

export default React.memo(ControlPanel);