/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Map, TileLayer, Marker, Popup, FeatureGroup,
} from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype.getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'marker-icon.png',
  iconUrl: 'marker-icon.png',
  shadowUrl: 'marker-shadow.png',
});

const BuyerDisplayMap = (props) => {
  const { coords, handleMarkerPlace, savedPolygons } = props;

  let editableFG = null;

  const onFeatureGroupReady = (reactFGref) => {
    // populate the leaflet FeatureGroup with the geoJson layers
    if (reactFGref) {
      if (savedPolygons.features && savedPolygons.features.length > 0) {
        console.log('RUNNING', reactFGref);
        const customGeoJSON = new L.GeoJSON(savedPolygons);

        const leafletFG = reactFGref.leafletElement;

        leafletFG.eachLayer((layer) => {
          leafletFG.removeLayer(layer);
        });

        customGeoJSON.eachLayer((layer) => {
          leafletFG.addLayer(layer);
        });
        console.log('FG', editableFG);
      }
      editableFG = reactFGref;
    }
  };

  const addMarker = (e) => {
    handleMarkerPlace(e.latlng);
  };

  const renderMarker = () => {
    if (coords.lat) {
      return (
        <Marker position={coords}>
          <Popup>
            <span>
              Your location.
            </span>
          </Popup>
        </Marker>
      );
    }
    return null;
  };

  return (
    <Map center={[53.4808, -2.2426]} zoom={13} zoomControl={false} onClick={addMarker}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={(reactFGref) => { onFeatureGroupReady(reactFGref); }} />
      {renderMarker()}
    </Map>
  );
};

export default BuyerDisplayMap;
