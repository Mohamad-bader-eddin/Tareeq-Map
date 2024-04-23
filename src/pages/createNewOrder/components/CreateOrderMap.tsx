import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Pin } from "../types/createOrderType";
import { useEffect, useState } from "react";
import useSearchPointQuery from "../hooks/useSearchPointQuery";
import { Alert, Box } from "@mui/material";
import Spinner from "../../../share/Spinner";
import { getPoint } from "../utils/getPoint";
import usePointValidateQuery from "../hooks/usePointValidateQuery";
import { regex } from "../constant";

const CreateOrderMap = ({
  marker,
  setMarker,
  placeId,
  setIsValid,
  isSet,
  setIsSet,
  setAddress,
  addressFromSearch,
}: CreateOrderMapProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const { data, refetch, isLoading } = useSearchPointQuery(placeId);
  const { mutate, isLoading: isLoadingPoint } = usePointValidateQuery();
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
    if (placeId) {
      refetch();
    }
    setIsSet(false);
  }, [placeId, refetch, setIsSet]);
  const centerPoint = getPoint({ data: data?.data.content });
  useEffect(() => {
    if (!isSet && centerPoint) {
      setIsSet(true);
      setMarker({ position: { lat: centerPoint.lat, lng: centerPoint.long } });
      setAddress(addressFromSearch ? addressFromSearch : centerPoint.address);
      if (map) {
        setZoom(17);
        setCenter({
          lat: centerPoint.lat,
          lng: centerPoint.long,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centerPoint, isSet, setAddress, setIsSet, setMarker]);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    mutate(
      { lat: e.latLng?.lat() as number, long: e.latLng?.lng() as number },
      {
        onSuccess: (response) => {
          if (response?.data.content.status === false) {
            setIsValid(true);
            setOpenAlert(true);
          } else {
            setIsValid(false);
            setOpenAlert(false);
          }
        },
      }
    );
    setMarker({
      position: {
        lat: e.latLng?.lat() as number,
        lng: e.latLng?.lng() as number,
      },
    });
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode(
      { location: e.latLng, language: "ar" },
      (results, status) => {
        if (status === "OK") {
          if (results) {
            for (const result of results) {
              if (!regex.test(result.formatted_address)) {
                setAddress(result.formatted_address);
                // console.log(result.formatted_address);
                break;
              }
            }
            if (map) {
              setZoom(map.getZoom());
              setCenter(map.getCenter());
            }
            // const address = results[2].formatted_address;
            // console.log("Address:", address);
          }
        }
      }
    );
  };
  return (
    <Box sx={{ position: "relative", height: "400px", width: "100%" }}>
      {isLoading || isLoadingPoint ? (
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 10,
          }}
        >
          <Spinner />
        </Box>
      ) : null}
      <LoadScript googleMapsApiKey="AIzaSyCiyuZuf6jsA7mtfN_Q25tGuPEJyh4zTZA">
        <GoogleMap
          onLoad={onMapLoad}
          center={center}
          zoom={zoom}
          mapContainerStyle={{ height: "400px", width: "100%" }}
          onClick={handleMapClick}
        >
          <Marker position={marker.position} />
        </GoogleMap>
      </LoadScript>
      {openAlert ? (
        <Alert
          sx={{ position: "absolute", width: "250px", bottom: "10px" }}
          variant="filled"
          severity="error"
        >
          this area outside our service
        </Alert>
      ) : null}
    </Box>
  );
};

type CreateOrderMapProps = {
  marker: Pin;
  setMarker: React.Dispatch<React.SetStateAction<Pin>>;
  placeId: string;
  setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
  isSet: boolean;
  setIsSet: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  addressFromSearch?: string;
};

export default CreateOrderMap;
