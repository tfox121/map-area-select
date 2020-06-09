/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Map, TileLayer, FeatureGroup,
} from 'react-leaflet';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';

const LeafletDisplayMap = (props) => {
  const { savedPolygons, onChange } = props;

  // see http://leaflet.github.io/Leaflet.draw/docs/leaflet-draw-latest.html#l-draw-event for leaflet-draw events doc

  let editableFG = null;

  const onFeatureGroupReady = (reactFGref) => {
    // populate the leaflet FeatureGroup with the geoJson layers
    if (reactFGref) {
      if (savedPolygons.features && savedPolygons.features.length > 0) {
        const customGeoJSON = new L.GeoJSON(savedPolygons);

        const leafletFG = reactFGref.leafletElement;

        leafletFG.eachLayer((layer) => {
          leafletFG.removeLayer(layer);
        });

        customGeoJSON.eachLayer((layer) => {
          leafletFG.addLayer(layer);
        });
      }
      editableFG = reactFGref;
    }
  };

  const _onChange = () => {
    // editableFG contains the edited geometry, which can be manipulated through the leaflet API

    console.log('CHANGE', editableFG);
    if (!editableFG || !onChange) {
      return;
    }

    const geojsonData = editableFG.leafletElement.toGeoJSON();
    onChange(geojsonData);
  };

  const onEdited = () => {
    _onChange();
  };

  const onCreated = (e) => {
    const type = e.layerType;
    console.log('onCreated: something else created:', type, e);
    // Do whatever else you need to. (save to db; etc)

    _onChange();
  };

  const onDeleted = (e) => {
    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);

    _onChange();
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
            },
          }}
        />
      </FeatureGroup>
    </Map>
  );
};

export default LeafletDisplayMap;
