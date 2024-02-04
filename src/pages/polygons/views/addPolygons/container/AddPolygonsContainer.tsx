import { Box } from "@mui/material";
import GenericAlert from "../../../../../share/alert/GenericAlert";
import AddPolygonsForm from "../components/AddPolygonsForm";
import useAddPolygonValidation from "../hooks/useAddPolygonValidation";
import { theme } from "../../../../../share/utils/theme";
import { useDarkMode } from "../../../../../context/DarkMode";

const AddPolygonsContainer = () => {
  const { darkMode } = useDarkMode();
  const {
    initialValues,
    onSubmit,
    validationSchema,
    errorMsg,
    openError,
    setOpenError,
    msg,
    openSucsses,
    setOpenSucsses,
  } = useAddPolygonValidation();

  return (
    <Box
      sx={{
        background: darkMode ? theme.dark.sidebar : theme.light.sidebar,
        paddingBlock: "20px",
      }}
    >
      <AddPolygonsForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
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

export default AddPolygonsContainer;
