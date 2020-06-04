import React from "react";
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from 'react-mapbox-gl-draw';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

const DrawMap = (props) => {
  const { handleDrawCreate } = props

  const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1IjoidGZveDEyMSIsImEiOiJja2FzaWJkNWQwanNyMzBtc2lmcHhoY21lIn0.FcFq9nEjkIh3sXfjCpyWoA"
  });

  return (
      <Map
        style="mapbox://styles/tfox121/ckashov8x13gl1io6rws1mz9w"
        containerStyle={{
          height: '100%',
          width: '100% '
        }}
        center={{ lng: -2.2426, lat: 53.4808 }}
      >
        <DrawControl
          boxSelect={false}
          controls={{
            point: false,
            line_string: false,
            combine_features: false,
            uncombine_features: false
          }}
          onDrawCreate={handleDrawCreate}
        />
      </Map>
  )
}

export default DrawMap;