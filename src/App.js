/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Segment, Button,
} from 'semantic-ui-react';
import * as d3 from 'd3';

import './App.css';

import VendorDrawMap from './VendorDrawMap';
import VendorEditMap from './VendorEditMap';
import BuyerDisplayMap from './BuyerDisplayMap';


const App = () => {
  const [savedPolygons, setSavedPolygons] = useState({});
  const [coords, setCoords] = useState([]);

  const handleMarkerPlace = (latlng) => {
    // const { lat, lng } = layer._latlng;
    // console.log(layer);
    setCoords(latlng);
  };

  const handleChange = (change) => {
    console.log('CHANGE');
    setSavedPolygons(change);
  };

  const polygonSubmit = (evt) => {
    evt.preventDefault();
  };

  const coordsSubmit = (evt) => {
    evt.preventDefault();
  };

  const polygonsContainCoords = (polygonsObj, latlng) => {
    const { lat, lng } = latlng;
    let contains = false;
    if (d3.geoContains(polygonsObj, [lng, lat])) {
      contains = true;
    }

    return contains;
  };

  useEffect(() => {
    console.log(savedPolygons);
  }, [savedPolygons]);

  useEffect(() => {
    if (coords.lat && Object.keys(savedPolygons).length !== 0) {
      console.log(polygonsContainCoords(savedPolygons, coords));
    }
  }, [coords, savedPolygons]);

  const renderCoords = () => {
    if (savedPolygons.features && savedPolygons.features.length > 0) {
      const polygonArray = savedPolygons.features;
      return (
        <ol>
          {polygonArray.map((geoJson) => (
            <li key={`${geoJson.geometry.coordinates[0]}${geoJson.geometry.coordinates[1]}`}>
              {geoJson.geometry.coordinates[0].join(' || ')}
            </li>
          ))}
        </ol>
      );
    }
    return null;
  };

  return (
    <Segment className="map-container">
      <VendorDrawMap onChange={handleChange} />
      <Button onClick={polygonSubmit}>Submit Coordinates!</Button>
      <Segment>
        {renderCoords()}
      </Segment>
      <VendorEditMap savedPolygons={savedPolygons} onChange={handleChange} />
      <Button onClick={polygonSubmit}>Submit Coordinates!</Button>
      <BuyerDisplayMap savedPolygons={savedPolygons} coords={coords} handleMarkerPlace={handleMarkerPlace} />
      <Button onClick={coordsSubmit}>Check Location</Button>

    </Segment>
  );
};

export default App;
