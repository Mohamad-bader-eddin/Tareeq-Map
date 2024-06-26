import useCourierOnDemandValidation from "../hooks/useCourierOnDemandValidation";
import CourierOnDemandForm from "../components/CourierOnDemandForm";
import { useState } from "react";
import { Pin } from "../types/createOrderType";
import { Option } from "../types/optionsLocationsType";
import GenericAlert from "../../../share/alert/GenericAlert";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useDarkMode } from "../../../context/DarkMode";
import { theme } from "../../../share/utils/theme";

const CourierOnDemandContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const token = queryParams.get("token");
  sessionStorage.setItem("token", token as string);
  const { darkMode } = useDarkMode();
  const [sourceMarker, setSourceMarker] = useState<Pin>({} as Pin);
  const [destinationMarker, setDestinationMarker] = useState<Pin>({} as Pin);
  const [sourceLocation, setSourceLocation] = useState<Option>({} as Option);
  const [destinationLocation, setDestinationLocation] = useState<Option>(
    {} as Option
  );
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const {
    initialValues,
    validationSchema,
    onSubmit,
    errorMsg,
    msg,
    openError,
    openSucsses,
    setOpenError,
    setOpenSucsses,
  } = useCourierOnDemandValidation({
    destinationMarker,
    sourceMarker,
    userId: id as string,
    sourceAddress,
    destinationAddress,
  });

  return (
    <Box
      sx={{
        paddingBlock: "20px",
        paddingInline: "10px",
        background: darkMode ? theme.dark.sidebar : theme.light.sidebar,
      }}
    >
      <CourierOnDemandForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        destinationLocation={destinationLocation}
        destinationMarker={destinationMarker}
        setDestinationLocation={setDestinationLocation}
        setDestinationMarker={setDestinationMarker}
        setSourceLocation={setSourceLocation}
        setSourceMarker={setSourceMarker}
        sourceLocation={sourceLocation}
        sourceMarker={sourceMarker}
        setSourceAddress={setSourceAddress}
        setDestinationAddress={setDestinationAddress}
      />
      <GenericAlert
        open={openSucsses}
        setOpen={setOpenSucsses}
        type="success"
        msg={msg}
      />
      <GenericAlert
        open={openError}
        setOpen={setOpenError}
        type="error"
        msg={errorMsg}
      />
    </Box>
  );
};
export default CourierOnDemandContainer;
