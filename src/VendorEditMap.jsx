/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Map, TileLayer, FeatureGroup,
} from 'react-leaflet';
import L from 'leaflet';
import { EditControl } from 'react-leaflet-draw';

// work around broken icons when using webpack, see https://github.com/PaulLeCam/react-leaflet/issues/255

delete L.Icon.Default.prototype.getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'marker-icon.png',
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
});

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

  // eslint-disable-next-line no-underscore-dangle
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
    const { layer } = e;
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
            },
          }}
        />
      </FeatureGroup>
    </Map>
  );
};

// data taken from the example in https://github.com/PaulLeCam/react-leaflet/issues/176


export default LeafletDisplayMap;
