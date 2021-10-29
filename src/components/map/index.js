/* eslint-disable jsx-a11y/anchor-is-valid */

import "./index.scss";

import React, { useRef, useState } from "react";

import ReactMapGL, { Marker } from '@goongmaps/goong-map-react';
import Pin from './Pin';
import ControlPanel from './ControlPanel/index';
import LayerPanel from './LayerPanel/index';
const GOONG_MAPTILES_KEY = '1YVQoTkZWUdNrHJOUf3jEXI1CxlWqvUfghcn6tRa';

const FIXED_POINT = [
    {
        id: 1,
        name: "Nhà trai",
        location: "Yên Tập, Nhân Hòa, Mỹ Hào, Hưng Yên",
        latitude: 20.951629,
        longitude: 106.058693,
        code: '1'
    }, {
        id: 2,
        name: "Nhà gái",
        location: "Yên Tập, Nhân Hòa, Mỹ Hào, Hưng Yên",
        latitude: 21.01493,
        longitude: 106.388990,
        code: '2'
    },
];

const Map = () => {
    const mapRef = useRef();
    const [viewport, setViewport] = useState({
        latitude: 20.946474,
        longitude: 106.234035,
        zoom: 9,
        bearing: 0,
        pitch: 0
    });

    const [mapStyle, setMapStyle] = useState('');

    const [showInfo, setShowInfo] = useState();

    const setSelectedPoint = (point) => {
        setShowInfo(point);
    }

    const goToPoint = (point) => {
        setShowInfo(point);
    }

    return (
        <div className="map-box">
            <ReactMapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                mapStyle={mapStyle}
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
                            <Pin size={20} color="#e81a1a" textColor="#ffffff" name={point.code} />
                        </div>
                    </Marker>
                ))}
                <LayerPanel onChange={setMapStyle} />
                <ControlPanel />
            </ReactMapGL>
        </div>
    );
}
export default React.memo(Map);
