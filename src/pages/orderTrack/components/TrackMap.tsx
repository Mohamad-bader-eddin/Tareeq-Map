import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";
import { Order } from "../types/order";

const TrackMap = ({ data }: { data: Order }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [directions, setDirections] = useState<any>(null); // state to store directions
  const [updateDirections, setUpdateDirections] = useState<boolean>(false);

  // Define your origin and destination coordinates
  const origin = {
    lat: data.order_points[0].lat,
    lng: data.order_points[0].long,
  };
  const destination = {
    lat: data.order_points[1].lat,
    lng: data.order_points[1].long,
  };

  // Callback function for the DirectionsService response
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const directionsCallback = (response: any) => {
    if (!updateDirections && response) {
      setDirections(response);
      setUpdateDirections(true);
    }
  };

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
      </GoogleMap>
    </LoadScript>
  );
};

export default TrackMap;
