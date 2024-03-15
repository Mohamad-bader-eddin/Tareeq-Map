import { useLocation } from "react-router-dom";
import BirdEyeMap from "../components/BirdEyeMap";
import useBirdEyeQuery from "../hooks/useBirdEyeQuery";
import { Backdrop } from "@mui/material";
import Spinner from "../../../share/Spinner";

const BirdEyeContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  sessionStorage.setItem("token", token as string);
  const { data, isLoading } = useBirdEyeQuery();
  return (
    <>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <Spinner />
        </Backdrop>
      ) : (
        <BirdEyeMap data={data?.data.content} />
      )}
    </>
  );
};

export default BirdEyeContainer;
