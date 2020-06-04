import React, { useEffect, useState } from "react";
import { Segment, Button } from "semantic-ui-react";

import './App.css'

import DrawMap from './DrawMap'
import DisplayMap from './DisplayMap'
import LeafletDrawMap from './LeafletDrawMap'

const App = () => {
  const [savedPolygons, setSavedPolygons] = useState({})
  const areaPolygons = {}

  const handleDrawCreate = (layer)=> {
    console.log(layer)
    areaPolygons[layer._leaflet_id] = layer
    console.log(areaPolygons)
  }

  const handleClick = (evt) => {
    evt.preventDefault()
    setSavedPolygons(areaPolygons)
  }

  useEffect(() => {
    console.log(savedPolygons)
  }, [savedPolygons])

  const renderCoords = () => {
    if (savedPolygons) {
      const polygonArray = Object.values(savedPolygons)
      return (
        <ol>
          {polygonArray.map(layerObj => {
            return (
              <li key={layerObj._leaflet_id}>
                {layerObj._latlngs.join(' || ')}
              </li>
            )
          })}
        </ol>
      )
    }
  }

  return (
    <Segment className="map-container">
      <LeafletDrawMap handleDrawCreate={handleDrawCreate} />
      <Button onClick={handleClick}>Submit Coordinates!</Button>
      <Segment>
        {renderCoords()}
      </Segment>
      <DisplayMap />
    </Segment>
  );
};

export default App;
