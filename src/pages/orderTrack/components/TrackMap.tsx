import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Order } from "../types/order";
import pusher from "../../../pusherSetup";
import { useWindowFocused } from "../../../context/WindowFocused";

const TrackMap = ({ data }: { data: Order }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [directions, setDirections] = useState<any>(null); // state to store directions
  const [updateDirections, setUpdateDirections] = useState<boolean>(false);
  const [marker, setMarker] = useState<Markers | null>(null);
  const { isWindowFocused } = useWindowFocused();

  // Define your origin and destination coordinates
  const origin = {
    lat: data.order_points[0].lat,
    lng: data.order_points[0].long,
  };
  const destination = {
    lat: data.order_points[1].lat,
    lng: data.order_points[1].long,
  };
  if (data.driver) {
    setMarker({
      id: data.driver.id,
      position: {
        lat: data.driver.current_lat,
        lng: data.driver.current_long,
      },
    });
  }

  // Callback function for the DirectionsService response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const directionsCallback = (response: any) => {
    if (!updateDirections && response) {
      setDirections(response);
      setUpdateDirections(true);
    }
  };

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
        zoom={13}
        mapContainerStyle={{ height: "400px", width: "100%" }}
        center={origin}
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
  id: number;
  position: google.maps.LatLngLiteral;
};

export default TrackMap;
