import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Pin } from "../types/createOrderType";
import { useEffect, useState } from "react";
import useSearchPointQuery from "../hooks/useSearchPointQuery";
import { Alert, Box } from "@mui/material";
import Spinner from "../../../share/Spinner";
import { getPoint } from "../utils/getPoint";
import usePointValidateQuery from "../hooks/usePointValidateQuery";

const CreateOrderMap = ({
  marker,
  setMarker,
  placeId,
  setIsValid,
}: CreateOrderMapProps) => {
  const [openAlert, setOpenAlert] = useState(false);
  const { data, refetch, isLoading } = useSearchPointQuery(placeId);
  const { mutate, isLoading: isLoadingPoint } = usePointValidateQuery();
  useEffect(() => {
    if (placeId) {
      refetch();
    }
  }, [placeId, refetch]);
  const centerPoint = getPoint({ data: data?.data.content });

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    mutate(
      { lat: e.latLng?.lat() as number, long: e.latLng?.lng() as number },
      {
        onSuccess: (response) => {
          if (response?.data === "outside") {
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
          center={{
            lat: centerPoint ? centerPoint.lat : 33.513674,
            lng: centerPoint ? centerPoint.long : 36.276526,
          }}
          zoom={centerPoint ? 17 : 13}
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
};

export default CreateOrderMap;
