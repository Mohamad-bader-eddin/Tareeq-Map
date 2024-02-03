import { useParams } from "react-router-dom";
import TrackMap from "../components/TrackMap";
import useOrderQuery from "../hooks/useOrderQuery";
import { Backdrop } from "@mui/material";
import Spinner from "../../../share/Spinner";

const OrderTrackContainer = () => {
  const { id } = useParams();
  const { data, isLoading } = useOrderQuery(id as string);
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
        <TrackMap data={data?.data.content} />
      )}
    </>
  );
};

export default OrderTrackContainer;
