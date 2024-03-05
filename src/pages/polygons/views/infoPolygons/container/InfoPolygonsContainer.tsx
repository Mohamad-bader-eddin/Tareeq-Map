import { Backdrop, Box } from "@mui/material";
import GenericAlert from "../../../../../share/alert/GenericAlert";
import { theme } from "../../../../../share/utils/theme";
import { useDarkMode } from "../../../../../context/DarkMode";
import useUpdatePolygonValidation from "../hooks/useUpdatePolygonValidation";
import usePolygonQuery from "../hooks/usePolygonQuery";
import { useLocation } from "react-router-dom";
import UpdatPolygonsForm from "../components/UpdatPolygonsForm";
import Spinner from "../../../../../share/Spinner";

const InfoPolygonsContainer = () => {
  const { darkMode } = useDarkMode();
  // const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const token = queryParams.get("token");
  sessionStorage.setItem("token", token as string);
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
        paddingBlock: "20px",
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
