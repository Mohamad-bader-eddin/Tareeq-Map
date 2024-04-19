import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { Order } from "../types/order";
import pusher from "../../../pusherSetup";
import { BirdEyePusher } from "../../birdEye/types";

const TrackMap = ({ data }: { data: Order }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [directions, setDirections] = useState<any>(null); // state to store directions
  const [updateDirections, setUpdateDirections] = useState<boolean>(false);
  const [marker, setMarker] = useState<Markers | null>(null);
  const [driverMarker, setDriverMarker] = useState<Markers | null>(null);
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral>(null!);
  const [destination, setDestination] = useState<google.maps.LatLngLiteral>(
    null!
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Define your origin and destination coordinates
    setOrigin({
      lat: data.order_points[0].lat,
      lng: data.order_points[0].long,
    });
    setDestination({
      lat: data.order_points[1].lat,
      lng: data.order_points[1].long,
    });
    if (data.driver && data.status !== "rejected" && data.status !== "paid") {
      setMarker({
        id: data.driver.id,
        position: {
          lat: data.driver.current_lat,
          lng: data.driver.current_long,
        },
      });
    }
  }, [data]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [map, setMap] = useState<any>(null);
  const [zoom, setZoom] = useState(13);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(origin);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onMapLoad = (mapInstance: any) => {
    setMap(mapInstance);
  };

  // Callback function for the DirectionsService response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const directionsCallback = (response: any) => {
    if (!updateDirections && response) {
      setDirections(response);
      setUpdateDirections(true);
    }
  };

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
      // console.log("Received data:", data);
      setDriverMarker({
        id: data.data.id,
        position: { lat: data.data.lat, lng: data.data.long },
      });
      // Handle the received data as needed
    });
  }, []);

  useEffect(() => {
    if (driverMarker && marker) {
      if (driverMarker.id === marker.id) {
        setMarker(driverMarker);
        if (map) {
          setZoom(map.getZoom());
          setCenter(map.getCenter());
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [driverMarker]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyCiyuZuf6jsA7mtfN_Q25tGuPEJyh4zTZA">
      <GoogleMap
        mapContainerStyle={{ height: "400px", width: "100%" }}
        center={center}
        onLoad={onMapLoad}
        zoom={zoom}
      >
        {/* DirectionsService for fetching directions */}
        <DirectionsService
          options={{
            destination: destination,
            origin: origin,
            travelMode: "DRIVING" as google.maps.TravelMode,
          }}
          callback={directionsCallback}
        />

        {/* DirectionsRenderer for displaying directions on the map */}
        {directions && <DirectionsRenderer directions={directions} />}
        {marker && (
          <Marker
            position={marker.position}
            icon={{
              url: "/images/car.svg",
            }}
            zIndex={10}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

type Markers = {
  id: string;
  position: google.maps.LatLngLiteral;
};

export default TrackMap;
