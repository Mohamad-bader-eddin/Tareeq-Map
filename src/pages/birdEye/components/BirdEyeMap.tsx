import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { BirdEye } from "../types";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const BirdEyeMap = ({ data }: { data: BirdEye[] }) => {
  const [selectedMarkers, setSelectedMarkers] = useState<Markers[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Markers | null>(null);
  useEffect(() => {
    const markers: Markers[] = data?.map((marker) => ({
      id: marker.id,
      position: {
        lat: marker.current_lat,
        lng: marker.current_long,
      },
      info: marker.name,
    }));
    setSelectedMarkers([...markers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <LoadScript googleMapsApiKey="AIzaSyCiyuZuf6jsA7mtfN_Q25tGuPEJyh4zTZA">
      <GoogleMap
        center={{ lat: 33.513674, lng: 36.276526 }}
        zoom={13}
        mapContainerStyle={{ height: "400px", width: "100%" }}
      >
        {selectedMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => setSelectedMarker(marker)}
          >
            {selectedMarker?.id === marker.id && (
              <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                <Box sx={{ margin: "2px" }}>
                  <Typography variant="body1">{marker.info}</Typography>
                </Box>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

type Markers = {
  id: string;
  position: google.maps.LatLngLiteral;
  info: string;
};

export default BirdEyeMap;
