import { GoogleMap, LoadScript, Marker, Polygon } from "@react-google-maps/api";
import { useState } from "react";
import { FormikProps } from "formik";
import { Location, Markers } from "../types/AddPolygonsFormType";

const PolygonsMap = <T extends Record<string, unknown>>({
  formik,
}: PolygonsMapProps<T>) => {
  const [selectedMarkers, setSelectedMarkers] = useState<Markers[]>([]);
  const locations: Location[] = [];

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    // Update the selectedLocation state when the map is clicked
    setSelectedMarkers((prev) => [
      ...prev,
      {
        id: selectedMarkers.length + 1,
        position: {
          lat: e.latLng?.lat() as number,
          lng: e.latLng?.lng() as number,
        },
      },
    ]);
    selectedMarkers.forEach((loc) =>
      locations.push({
        latitude: loc.position.lat,
        longitude: loc.position.lng,
      })
    );
    locations.push({
      latitude: e.latLng?.lat() as number,
      longitude: e.latLng?.lng() as number,
    });
    formik.setFieldValue("locations", locations);
  };

  const handleMarkerClick = (position: google.maps.LatLngLiteral) => {
    const point = selectedMarkers.findIndex((el) => el.position === position);
    selectedMarkers.splice(point, 1);
    setSelectedMarkers([...selectedMarkers]);
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCiyuZuf6jsA7mtfN_Q25tGuPEJyh4zTZA">
      <GoogleMap
        center={{ lat: 33.513674, lng: 36.276526 }}
        zoom={13}
        mapContainerStyle={{ height: "400px", width: "100%" }}
        onClick={handleMapClick}
      >
        {selectedMarkers.map((marker) => (
          <Marker
            key={marker.id}
            position={marker.position}
            onClick={() => handleMarkerClick(marker.position)}
          ></Marker>
        ))}
        <Polygon
          paths={selectedMarkers.map((path) => path.position)}
          options={{
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

type PolygonsMapProps<T> = {
  formik: FormikProps<T>;
};

export default PolygonsMap;
