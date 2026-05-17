import { useJsApiLoader } from "@react-google-maps/api";

export const useGoogleMaps = () => {
  return useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });
};
