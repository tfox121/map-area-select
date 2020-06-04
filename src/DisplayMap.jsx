import React from "react";
import ReactMapboxGl, { GeoJSONLayer, Layer, Feature, Source } from 'react-mapbox-gl';
import GeoJSON from "geojson"

const DisplayMap = () => {
  const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoidGZveDEyMSIsImEiOiJja2FzaWJkNWQwanNyMzBtc2lmcHhoY21lIn0.FcFq9nEjkIh3sXfjCpyWoA"
  });

  const geoData = {
    type: "geoJSON",
    data: {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[-2.376746450231167, 53.52250815546603], [-2.486167419016823, 53.48896833079553], [-2.279950977844635, 53.48896833079553], [-2.376746450231167, 53.52250815546603]]
      },
      properties: {
        title: "Polygon!",
        "marker-symbol": "monument"
      }
    }
  }

  const data = {
    polygon: [
      [[-2.376746450231167, 53.52250815546603], [-2.486167419016823, 53.48896833079553], [-2.279950977844635, 53.48896833079553], [-2.376746450231167, 53.52250815546603]]
    ]
  }

  const parsedData = GeoJSON.parse(data, {'Polygon': 'polygon'})

  console.log(parsedData)

  return (
      <Map
        style="mapbox://styles/tfox121/ckashov8x13gl1io6rws1mz9w"
        containerStyle={{
          height: '100%',
          width: '100% '
        }}
        center={{ lng: -2.2426, lat: 53.4808 }}
      >
      <GeoJSONLayer
        data={parsedData}
        linePaint={{
          "line-color": "#000000",
          "line-width": 1
        }}
      />
      </Map>
  )
}

export default DisplayMap;