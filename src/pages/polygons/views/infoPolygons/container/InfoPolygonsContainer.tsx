import { Backdrop, Box } from "@mui/material";
import GenericAlert from "../../../../../share/alert/GenericAlert";
import { theme } from "../../../../../share/utils/theme";
import { useDarkMode } from "../../../../../context/DarkMode";
import useUpdatePolygonValidation from "../hooks/useUpdatePolygonValidation";
import usePolygonQuery from "../hooks/usePolygonQuery";
import { useParams } from "react-router-dom";
import UpdatPolygonsForm from "../components/UpdatPolygonsForm";
import Spinner from "../../../../../share/Spinner";

const InfoPolygonsContainer = () => {
  const { darkMode } = useDarkMode();
  const { id } = useParams();
  const { data, isLoading } = usePolygonQuery(id as string);
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
  } = useUpdatePolygonValidation({
    data: data?.data.content,
    id: id as string,
  });

  return (
    <Box
      sx={{
        background: darkMode ? theme.dark.sidebar : theme.light.sidebar,
      }}
    >
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <Spinner />
        </Backdrop>
      ) : (
        <UpdatPolygonsForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        />
      )}
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

export default InfoPolygonsContainer;
