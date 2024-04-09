import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { BirdEye, BirdEyePusher } from "../types";
import { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import pusher from "../../../pusherSetup";

const BirdEyeMap = ({ data }: { data: BirdEye[] }) => {
  const [selectedMarkers, setSelectedMarkers] = useState<Markers[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Markers | null>(null);
  const [movedMarker, setMovedMarker] = useState<Markers | null>(null);
  const intervalRef = useRef<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 33.513674,
    lng: 36.276526,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMapLoad = (mapInstance: any) => {
    setMap(mapInstance);
  };
  useEffect(() => {
    const markers: Markers[] = data?.map((marker) => ({
      id: marker.id,
      position: {
        lat: marker.current_lat,
        lng: marker.current_long,
      },
      info: marker.name + " " + marker?.last_name,
      orderNumber: marker.order_id,
    }));
    setSelectedMarkers([...markers]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopTimer = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
  };

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      if (pusher.connection.state !== "connected") pusher.connect();
    }, 5000);
    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    const channel = pusher.subscribe("channel-admin");
    channel.bind("bird-eye-event", (data: BirdEyePusher) => {
      setMovedMarker({
        id: data.data.id,
        position: { lat: data.data.lat, lng: data.data.long },
        info: data.data.name + " " + data.data?.last_name,
        orderNumber: data.data.order_id,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newMarkers = [...selectedMarkers];
    const index = newMarkers.findIndex((item) => item.id === movedMarker?.id);
    if (index !== -1 && movedMarker) {
      newMarkers[index] = { ...movedMarker };
      setSelectedMarkers(newMarkers);
      if (map) {
        setZoom(map.getZoom());
        setCenter(map.getCenter());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movedMarker]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCiyuZuf6jsA7mtfN_Q25tGuPEJyh4zTZA">
      <GoogleMap
        onLoad={onMapLoad}
        center={center}
        zoom={zoom}
        mapContainerStyle={{ height: "400px", width: "100%" }}
      >
        {selectedMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => setSelectedMarker(marker)}
            icon={
              marker.orderNumber
                ? {
                    url: "/images/blueMarker.svg",
                  }
                : {
                    url: "/images/greenMarker.svg",
                  }
            }
          >
            {selectedMarker?.id === marker.id && (
              <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                <Box sx={{ margin: "2px" }}>
                  <Typography variant="body1">{marker.info}</Typography>
                  {marker.orderNumber ? (
                    <Typography variant="body1">
                      Order NO. {marker.orderNumber}
                    </Typography>
                  ) : null}
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
  orderNumber?: number;
};

export default BirdEyeMap;
