/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import {
  Segment, Header, Grid,
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
    setCoords(latlng);
  };

  const handleChange = (change) => {
    console.log('CHANGE');
    setSavedPolygons(change);
  };

  const checkPolygonsContainCoords = (polygonsObj, latlng) => {
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
      console.log(checkPolygonsContainCoords(savedPolygons, coords));
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
      <Segment>
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Header>Vendor setup phase draw map:</Header>
              <VendorDrawMap onChange={handleChange} />
              <Header>Vendor dashboard edit:</Header>
              <VendorEditMap savedPolygons={savedPolygons} onChange={handleChange} />
            </Grid.Column>
            <Grid.Column>
              <Header>Saved polygons:</Header>
              {renderCoords()}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment className="buyer-display-map">
        <Header>Customer location selection:</Header>
        <BuyerDisplayMap savedPolygons={savedPolygons} coords={coords} handleMarkerPlace={handleMarkerPlace} />
        <Segment>
          <Header>Is the marker within a polygon?</Header>
          { coords.lat && Object.keys(savedPolygons).length !== 0
          && <div>{checkPolygonsContainCoords(savedPolygons, coords).toString()}</div>}
        </Segment>
      </Segment>
    </Segment>
  );
};

export default App;
