 

const Map = () => {

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
            <ControlPanel />
            <LayerPanel onChange={setMapStyle} />
            <SearchPanel mapRef={mapRef} onSearch={onSearch} />
            <FixedPoint/>
        </ReactMapGL>
        </div>
    );
}
export default React.memo(Map);
