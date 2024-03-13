import { GoogleMap, LoadScript } from "@react-google-maps/api";

const BirdEyeMap = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCiyuZuf6jsA7mtfN_Q25tGuPEJyh4zTZA">
      <GoogleMap
        center={{ lat: 33.513674, lng: 36.276526 }}
        zoom={13}
        mapContainerStyle={{ height: "400px", width: "100%" }}
      ></GoogleMap>
    </LoadScript>
  );
};

export default BirdEyeMap;
