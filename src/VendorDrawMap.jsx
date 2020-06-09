/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

import './VendorDrawMap.css';

const VendorDrawMap = (props) => {
  const { onChange } = props;

  let editableFG = null;

  const onFeatureGroupReady = (reactFGref) => {
    if (reactFGref) {
      editableFG = reactFGref;
    }
  };

  const _onChange = () => {
    console.log(onChange);

    if (!editableFG || !onChange) {
      return;
    }

    const geojsonData = editableFG.leafletElement.toGeoJSON();

    onChange(geojsonData);
  };

  const onEdited = (e) => {
    _onChange();
  };

  const onCreated = (e) => {
    const type = e.layerType;
    console.log('onCreated: something else created:', type, e);

    _onChange();
  };

  const onDeleted = () => {
    _onChange();
  };

  const onMounted = (drawControl) => {
    console.log('onMounted', drawControl);
  };

  const onEditStart = (e) => {
    console.log('onEditStart', e);
  };

  const onEditStop = (e) => {
    console.log('onEditStop', e);
  };

  const onDeleteStart = (e) => {
    console.log('onDeleteStart', e);
  };

  const onDeleteStop = (e) => {
    console.log('onDeleteStop', e);
  };

  return (
    <Map center={[53.4808, -2.2426]} zoom={13} zoomControl={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={(reactFGref) => { onFeatureGroupReady(reactFGref); }}>
        <EditControl
          position="topright"
          onEdited={onEdited}
          onCreated={onCreated}
          onDeleted={onDeleted}
          onMounted={onMounted}
          onEditStart={onEditStart}
          onEditStop={onEditStop}
          onDeleteStart={onDeleteStart}
          onDeleteStop={onDeleteStop}
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            polyline: false,
            marker: false,
            polygon: {
              allowIntersection: false,
              drawError: {
                color: '#e1e100',
                message: "<strong>Oh snap!<strong> you can't draw that!",
              },
              shapeOptions: {
                color: '#97009c',
              },
            },
          }}
        />
      </FeatureGroup>
    </Map>
  );
};

export default VendorDrawMap;
