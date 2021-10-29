import './index.scss';
import "@goongmaps/goong-geocoder/dist/goong-geocoder.css";

import React from 'react';

import { useRef, useState, useEffect } from 'react';
import GoongClient from '@goongmaps/goong-sdk';
import GoongDirections from '@goongmaps/goong-sdk/services/directions';
import SearchInput from './searchInput';
import { Marker, Source, Layer } from '@goongmaps/goong-map-react';
import Polyline from '@mapbox/polyline';
import Pin from '../../../Icons/Pin';
import { FIXED_POINT } from './fixedData';
// import GoongGeocoding from '@goongmaps/goong-sdk/services/geocoding';
const GEOCODER_KEY = 'fwWilEmSnpjjYJEQnB1JgwViOmF6sJ4F00h83eEZ';


const baseClient = GoongClient({ accessToken: GEOCODER_KEY });
const directionService = GoongDirections(baseClient);
// const geocodingService = GoongGeocoding(baseClient);

function SearchPanel(props) {
  // Search holder 
  const searchRef = useRef();
  const [stopPoints, setStopPoints] = useState([{}, {}]);
  const [routes, setRoutes] = useState([]);
  const [viewDirection, setViewDirection] = useState(false);
  const [vehicle, setVehicle] = useState('car');

  const changeVehicle = (vehicle) => {
    setVehicle(vehicle);
  }


  useEffect(() => {
    const getRoute = async (origin, destination) => {
      if (origin?.latitude && destination?.latitude) {
        if (origin.latitude === destination.latitude &&
          origin.longitude === destination.longitude
        ) {
          alert("Điểm bắt đầu và kết thúc trùng nhau!")
        }
        // Tìm nhanh nhất
        const resFastest = await directionService.getDirections({
          origin: `${origin?.latitude},${origin?.longitude}`,
          destination: `${destination?.latitude},${destination?.longitude}`,
          vehicle: vehicle,
          type: 'fastest',//v.oneOf('fastest', 'shortest'),
          alternatives: true
        }).send();
        const routes = resFastest?.body?.routes;
        routes[0].selected = true;
        const result = {
          origin,
          destination,
          routes
        };

        return result;



      }

    }
    const getDirection = async () => {
      if (stopPoints.find(x => !x.name)) {
        return null;
      }
      const routesData = [];
      for (let index = 0; index < stopPoints.length; index++) {
        if (index !== 0) {
          routesData.push(await getRoute(stopPoints[index - 1], stopPoints[index]));

        }
      }
      setRoutes(routesData);

    }
    getDirection();
  }, [vehicle, stopPoints]);



  const onAddDestination = () => {
    setStopPoints([...stopPoints, {}])
  }
  const validateSearchInput = (location, index) => {
    const stopPointsData = [...stopPoints];
    stopPointsData[index] = location;
    const stringValidate = stopPointsData.map(x => `[${x.latitude}${x.longitude}]`);
    function checkIfDuplicateExists(arr) {
      return new Set(arr).size !== arr.length
    }
    if (checkIfDuplicateExists(stringValidate)) {
      alert("Vị trí các điểm bị trùng")
      return false;
    }
    return true;
  }
  const onSearchResult = async (location, from, index) => {
    if (from === 'search') {
      setStopPoints([
        { ...location, index: 1 }, {}
      ])
    } else {
      const stopPointsData = [...stopPoints];
      stopPointsData.splice(index, 1, { ...location });
      function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      await timeout(500);
      setStopPoints(stopPointsData);

    }
    props.onSearch({ ...location })
  }
  const removeStopPoint = async (index) => {
    const stopPointsData = [...stopPoints];
    stopPointsData.splice(index, 1);
    function timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    await timeout(500);
    setStopPoints(stopPointsData);
  }

  const renderStopPoint = () => {
    const components = [];
    stopPoints.forEach((points, index) => {
      components.push(
        <div className="search-input-direction" key={`${points?.latitude}${points?.longitude}${index}`}>
          <div className="points-btn">
            <Pin size={20} color="white" textColor="#1a73e8" name={index + 1} />
          </div>
          <SearchInput
            key={`${points?.latitude}${points?.longitude}${index}input`}
            mapRef={props.mapRef}
            locationData={points}
            placeholder={"Tìm kiếm địa điểm"}
            onSearchResult={(location) => onSearchResult(location, 'direction', index)}
            validateSearchInput={validateSearchInput}
            index={index}
            plusOffsetTop={stopPoints.length - index}
            showYourLocation
          />
          {stopPoints.length > 2 && <div className="lk-btn" onClick={() => removeStopPoint(index)}>
            <img alt="delete" className="delete-points close" src="images/search/delete.png" />
          </div>
          }
        </div>
      )
    });
    const hasUnFill = stopPoints.find(x => !x.name);
    return <div>
      {components}
      {!hasUnFill &&
        <div className="search-input-direction" onClick={() => onAddDestination()}>
          <div className="add points-btn">
            <img alt="add" src="images/search/add.png" />
          </div>
          <div className="add-points-lbl">Thêm điểm đến</div>
        </div>
      }

    </div>;
  }

  const renderMaker = () => {
    const components = [];
    stopPoints.forEach((points) => {
      if (points?.latitude && points?.longitude) {
        if(FIXED_POINT.find(x=>x.latitude ===points.latitude && x.longitude === points.longitude)){
          console.log("Fixed point")
        }else{
          components.push(
            <Marker key={`${points.latitude},${points.longitude}`}
              offsetTop={-20}
              offsetLeft={-10}
              latitude={points.latitude} longitude={points.longitude} >
              <Pin size={20} name={points.index + 1} />
            </Marker>
          )
        }
       
      }

    });
    return <>
      {components}
    </>;
  }

  const renderRoute = () => {
    const components = [];
    routes.forEach((route, index) => {
      // Get selected route 
      const selectedRoute = route.routes.find(x => x.selected) || route.routes[0];
      const geoJSON = Polyline.toGeoJSON(selectedRoute.overview_polyline.points);
      const firstPoint = geoJSON.coordinates[0];
      const lastPoint = geoJSON.coordinates[geoJSON.coordinates.length - 1];
      const idRoute = `route${index}`;
      // Walk to first
      components.push(
        <Source id={`${idRoute}1`} key={`${idRoute}1`} type="geojson" data={{
          type: "LineString",
          coordinates: [
            [route?.origin?.longitude, route?.origin?.latitude],
            firstPoint,
          ],
        }}  >
          <Layer  {...{
            'id': `${idRoute}1`,
            'key': `${idRoute}1`,
            'type': 'line',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#0f0f0f',
              'line-width': 3,
              'line-opacity': 1,
              'line-dasharray': [0.1, 3]
            },
          }} />
        </Source>
      )
      //  Last walk to destination
      components.push(
        <Source id={`${idRoute}2`} key={`${idRoute}2`} type="geojson" data={{
          type: "LineString",
          coordinates: [
            lastPoint,
            [route?.destination?.longitude, route?.destination?.latitude],
          ],
        }}  >
          <Layer  {...{
            'id': `${idRoute}2`,
            'key': `${idRoute}2`,
            'type': 'line',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#0f0f0f',
              'line-width': 3,
              'line-opacity': 1,
              'line-dasharray': [0.1, 3]
            },
          }} />
        </Source>
      )

      // Main route
      components.push(
        <Source id={`${idRoute}3`} key={`${idRoute}3`} type="geojson" data={geoJSON}  >
          <Layer  {...{
            'id': `${idRoute}3`,
            'key': `${idRoute}3`,
            'type': 'line',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#1e88e5',
              'line-width': 3,
              'line-opacity': 1,
            },
          }} />
        </Source>
      )
    });

    return <>
      {components}
    </>;
  }
  const changeDirection = (isDirection) => {
    setViewDirection(isDirection);
  }
  const swapStopPoints = () => {
    const stopPontsData = [stopPoints[1], stopPoints[0]];
    setStopPoints(stopPontsData);
  }
  const selectRoute = (indexParent, indexChild) => {
    const routesData = [...routes];
    routesData[indexParent].routes.forEach((x, index) => {
      routesData[indexParent].routes[index].selected = false;
    });
    routesData[indexParent].routes[indexChild].selected = true;
    setRoutes(routesData);
  }
  const renderDirections = () => {
    const components = [];
    routes.forEach((route, index) => {
      const indexParent = index;
      components.push(
        <div className="route-group-info" key={`route-group-info${index}`}>
          {
            stopPoints.length > 2 &&
            <label className="route">
              Di chuyển từ&nbsp;
              <strong>{route.origin.name}</strong>
              &nbsp;đến&nbsp;
              <strong>{route.destination.name}</strong>
            </label>
          }

          <ul >
            {route.routes.map((x, index) => (
              <li key={`li${index}`} className={x.selected ? 'active' : ''} onClick={() => selectRoute(indexParent, index)}>
                Quãng đường:&nbsp;<strong>{x.legs[0]?.distance.text}</strong>  <br />
                Thời gian:&nbsp;<strong>{x.legs[0]?.duration.text}</strong>
                <div className="navigate-btn">
                  <img alt="navigate" src="images/search/navigate.png" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )

    });

    return <>
      {components}
    </>;
  }

  return (
    <>
      {renderMaker()}
      {renderRoute()}
      <div className={'search-panel '} >
        {!viewDirection &&
          <div className="search-input" >
            <div ref={searchRef} key="geocoder" id="geocoder"></div>
            <SearchInput
              mapRef={props.mapRef}
              locationData={stopPoints[0]}
              placeholder={"Tìm kiếm địa điểm"}
              onSearchResult={(location) => onSearchResult(location, 'search')}
            />
            <div className="direction" title="Chỉ đường" onClick={() => changeDirection(true)}>
              <img alt="direction" src="images/search/direction.png" />
            </div>
          </div>
        }
        {viewDirection && <>
          <div className="search-direction">
            <div className="top-panel">
              <div className={(vehicle === 'car' ? 'active' : '') + ' img-btn vehicle car'} title="Ô tô" onClick={() => changeVehicle('car')}>
                <img alt="car" src="images/search/car.png" />
              </div>
              <div className={(vehicle === 'bike' ? 'active' : '') + ' img-btn vehicle bike'} title="Xe máy" onClick={() => changeVehicle('bike')}>
                <img alt="bike" src="images/search/bike.png" />
              </div>
              <div className={(vehicle === 'taxi' ? 'active' : '') + ' img-btn vehicle taxi'} title="Taxi" onClick={() => changeVehicle('taxi')}>
                <img alt="taxi" src="images/search/taxi.png" />
              </div>
              <div className={(vehicle === 'truct' ? 'active' : '') + ' img-btn vehicle truct'} title="Xe container" onClick={() => changeVehicle('truct')}>
                <img alt="truct" src="images/search/truct.png" />
              </div>
              <div className={(vehicle === 'hd' ? 'active' : '') + ' img-btn vehicle hd'} title="HD" onClick={() => changeVehicle('hd')}>
                <img alt="hd" src="images/search/hd.png" />
              </div>
              <div className="divider"></div>
              <div className="close close-direction" onClick={() => changeDirection(false)}>

              </div>
            </div>
            <div className="body-panel">
              {renderStopPoint()}
              {stopPoints.length === 2 && <div className="img-btn swap-direction" onClick={() => swapStopPoints()}>  <img alt="swap" src="images/search/swap.png" /></div>}
            </div>
          </div>
          <div className="search-direction-footer">
            {renderDirections()}
          </div>
        </>}
      </div>
    </>

  );
}

export default React.memo(SearchPanel);