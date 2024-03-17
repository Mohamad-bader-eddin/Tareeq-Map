import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { BirdEye } from "../types";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useWindowFocused } from "../../../context/WindowFocused";
import pusher from "../../../pusherSetup";

const BirdEyeMap = ({ data }: { data: BirdEye[] }) => {
  const [selectedMarkers, setSelectedMarkers] = useState<Markers[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Markers | null>(null);
  const { isWindowFocused } = useWindowFocused();
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
  useEffect(() => {
    pusher.connect();
  }, [isWindowFocused]);

  useEffect(() => {
    const channel = pusher.subscribe("channel-admin");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    channel.bind("order-route-event", (data: any) => {
      console.log("Received data:", data);
      // Handle the received data as needed
    });
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
