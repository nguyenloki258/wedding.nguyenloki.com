/* eslint-disable jsx-a11y/iframe-has-title */
import "./index.scss";

import React, { useState } from "react";
import { Marker } from "@goongmaps/goong-map-react";
import Pin from '../../../Icons/Pin';
import { FIXED_POINT} from '../SearchPanel/fixedData';
function FixedPoint(props) {
  
  const [selectedPoint, setSelectedPoint] = useState();

  return (
    <>
      {FIXED_POINT.map((point) => (
        <Marker
          key={`${point.latitude},${point.longitude}`}
          offsetTop={-20}
          offsetLeft={-10}
          latitude={point.latitude}
          longitude={point.longitude}
        >
          <div onClick={() => setSelectedPoint(point)}>

            <Pin size={40} color="#1a73e8" textColor="#ffffff" name={''} />
          </div>
        </Marker>
      ))}
      {selectedPoint && (
        <div class="detail-point-modal">

          <div class="header-modal">
            {selectedPoint.name}
            <span class="close-btn" onClick={() => setSelectedPoint(null)}>
            </span>
          </div>
          <div className="body-modal">
            <iframe
              width="100%"
              height="100%"
              src={selectedPoint.src}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>

        </div>
      )}
    </>
  );
}

export default React.memo(FixedPoint);
