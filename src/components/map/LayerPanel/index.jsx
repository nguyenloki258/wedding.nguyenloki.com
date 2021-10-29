import './index.scss';

import React from 'react';

import { useEffect, useState } from 'react';

import DARK from './data/goong_map_dark.json';
import LIGHT from './data/goong_light_v2.json';
import NAVIGATION_DARK from './data/navigation_night.json';
import NAVIGATION_LIGHT from './data/navigation_day.json';
import SATELLITE from './data/satellite.json'
import STREET from './data/goong_map_web.json'
import { fromJS } from 'immutable';

const categories = ['labels', 'roads', 'buildings', 'parks', 'water', 'background'];

const MAP_STYLES = [
  {
    name: 'Light',
    desc: 'Sáng',
    icon: 'images/layer/light.png',
    cssClass: 'light',
    nextLayer: {
      name: 'Satellite',
      desc: 'Vệ tinh',
      icon: 'images/layer/satellite.png',
      cssClass: 'light',
    }
  },
  {
    name: 'Dark',
    desc: 'Tối',
    icon: 'images/layer/dark.png',
    cssClass: 'dark',
    nextLayer: {
      name: 'Satellite',
      desc: 'Vệ tinh',
      icon: 'images/layer/satellite.png',
      cssClass: 'light',
    }
  },
  {
    name: 'Street',
    desc: 'Đường phố',
    icon: 'images/layer/street.png',
    cssClass: 'light',
    nextLayer: {
      name: 'Satellite',
      desc: 'Vệ tinh',
      icon: 'images/layer/satellite.png',
      cssClass: 'light',
    }
  },
  {
    name: 'N-Light',
    desc: 'N-Light',
    icon: 'images/layer/navigationLight.png',
    cssClass: 'light',
    nextLayer: {
      name: 'Satellite',
      desc: 'Vệ tinh',
      icon: 'images/layer/satellite.png',
      cssClass: 'light',
    }
  },
  {
    name: 'N-Dark',
    desc: 'N-Dark',
    icon: 'images/layer/navigationDark.png',
    cssClass: 'dark',
    nextLayer: {
      name: 'Satellite',
      desc: 'Vệ tinh',
      icon: 'images/layer/satellite.png',
      cssClass: 'light',
    }
  },
];

const MAP_LAYERS = [
  {
    name: 'labels',
    desc: 'Địa điểm',
    icon: 'images/layer/layer/labels.png',
  },
  {
    name: 'roads',
    desc: 'Đường phố',
    icon: 'images/layer/layer/roads.png',
  },
  {
    name: 'buildings',
    desc: 'Toà nhà',
    icon: 'images/layer/layer/buildings.png',
  },
  {
    name: 'parks',
    desc: 'Công viên',
    icon: 'images/layer/layer/parks.png',
  },
  {
    name: 'water',
    desc: 'Sông ngòi',
    icon: 'images/layer/layer/water.png',
  },
  {
    name: 'background',
    desc: 'Nền',
    icon: 'images/layer/layer/background.png',
  },

];
// Layer id patterns by category
const layerSelector = {
  background: /background/,
  water: /water/,
  parks: /park/,
  buildings: /building/,
  roads: /bridge|road|tunnel/,
  labels: /label|place|poi/
};

// Layer color class by type
const colorClass = {
  line: 'line-color',
  fill: 'fill-color',
  background: 'background-color',
  symbol: 'text-color'
};

function getMapStyle({ visibility, color, currentLayer }) {
  let mapStyle;
  switch (currentLayer.name) {
    case 'Light':
      mapStyle = fromJS(LIGHT);
      break;
    case 'Street':
      mapStyle = fromJS(STREET);
      break;
    case 'Satellite':
      mapStyle = fromJS(SATELLITE);
      break;
    case 'Dark':
      mapStyle = fromJS(DARK);
      break;
    case 'N-Light':
      mapStyle = fromJS(NAVIGATION_LIGHT);
      break;
    case 'N-Dark':
      mapStyle = fromJS(NAVIGATION_DARK);
      break;
    default:
      mapStyle = fromJS(LIGHT);
      break;
  }
  const mapLayer = mapStyle.get('layers');
  const layers = mapLayer
    .filter(layer => {
      const id = layer.get('id');
      return categories.every(name => visibility[name] || !layerSelector[name].test(id));
    })
    .map(layer => {
      const id = layer.get('id');
      const type = layer.get('type');
      const category = categories.find(name => layerSelector[name].test(id));
      if (category && colorClass[type]) {
        if (color[category])
          return layer.setIn(['paint', colorClass[type]], color[category]);
      }
      return layer;
    });

  return mapStyle.set('layers', layers);
}

function LayerPanel(props) {
  const [visibility, setVisibility] = useState({
    water: true,
    parks: true,
    buildings: true,
    roads: true,
    labels: true,
    background: true
  });
  const [showListLayer, setShowListLayer] = useState(false);
  const [showAdvancedSetting, setShowAdvancedSetting] = useState(false);
  const [color, setColor] = useState({
    water: null,
    parks: null,
    buildings: null,
    roads: null,
    labels: null,
    background: null
  });
  const [currentLayer, setCurrentLayer] = useState({
    name: 'Street',
    desc: 'Đường phố',
    icon: 'images/layer/street.png',
    cssClass: 'light',
    nextLayer: {
      name: 'Satellite',
      desc: 'Vệ tinh',
      icon: 'images/layer/satellite.png',
      cssClass: 'light',
    }
  });
  useEffect(() => {
    props.onChange(getMapStyle({ visibility, color, currentLayer }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibility, color, currentLayer]);

  const onColorChange = (name, value) => {
    setColor({ ...color, [name]: value });
  };

  const onVisibilityChange = (name, value) => {
    setVisibility({ ...visibility, [name]: value });
  };

  const onLayerChange = (layer) => {
    setCurrentLayer(layer);
    setVisibility({
      water: true,
      parks: true,
      buildings: true,
      roads: true,
      labels: true,
      background: true
    });
    onColorChange({
      water: null,
      parks: null,
      buildings: null,
      roads: null,
      labels: null,
      background: null
    });
  };

  const selectCurrentLayer = () => {
    const nextLayer = {
      ...currentLayer.nextLayer
    };
    const prevLayer = {
      ...currentLayer,
      nextLayer: undefined
    }
    setCurrentLayer({
      ...nextLayer,
      nextLayer: {
        ...prevLayer
      }
    });

  }

  return (
    <div className={'layer-panel ' + currentLayer.cssClass} onMouseEnter={() => setShowListLayer(true)} onMouseLeave={() => {
      setShowListLayer(false);
      setShowAdvancedSetting(false)
    }}>
      <div className="selected-layer" onClick={() => selectCurrentLayer()}>
        <div className="layer-block">
          <img alt={currentLayer.nextLayer?.desc} src={currentLayer.nextLayer?.icon} />
          <span>{currentLayer.nextLayer?.desc}</span>
        </div>
      </div>
      {/* List Layer */}
      {showListLayer &&
        <div className="list-layer">

          {currentLayer.name === 'Satellite' && MAP_STYLES.map(x => (
            <div key={x.name} className="layer-block" onClick={() => onLayerChange(x)} >
              <img alt={x.name} src={x.icon} />
              <span>{x.name}</span>
            </div>
          ))}
          {
            true &&
            <div className="layer-block advanced-setting" onClick={() => setShowAdvancedSetting(!showAdvancedSetting)} >
              <img alt={'Hiển thị'} src={'images/layer/config.png'} />
              <span>{'Hiển thị'}</span>
            </div>
          }

        </div>}
      {/* Advanced Layer */}
      {showAdvancedSetting && <div className="advanced-layer">
        {MAP_LAYERS.map(layer => (
          <div key={layer.name} className="input">
            <div className="setting-block">
              <input
                type="checkbox"
                checked={visibility[layer.name]}
                onChange={evt => onVisibilityChange(layer.name, evt.target.checked)}
              />
              <label>{layer.desc}</label>

              <input
                type="color"
                value={color[layer.name]}
                disabled={!visibility[layer.name]}
                onChange={evt => onColorChange(layer.name, evt.target.value)} />
            </div>


          </div>
        ))}
      </div>}
     


    </div>
  );
}

export default React.memo(LayerPanel);