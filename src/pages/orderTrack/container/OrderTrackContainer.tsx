import { useLocation } from "react-router-dom";
import TrackMap from "../components/TrackMap";
// import useOrderQuery from "../hooks/useOrderQuery";
import { Backdrop } from "@mui/material";
import Spinner from "../../../share/Spinner";
import useOrderShapeQuery from "../hooks/useOrderShapeQuery";
import useOrderTrackDetailsQury from "../hooks/useOrderTrackDetailsQury";

const OrderTrackContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const token = queryParams.get("token");
  sessionStorage.setItem("token", token as string);
  // const { data, isLoading } = useOrderQuery(id as string);
  const { data : orderShape, isLoading : orderShapeLoading } = useOrderShapeQuery(id as string);
  const { data : orderDetails, isLoading : orderDetailsLoading } = useOrderTrackDetailsQury(id as string);    
  
  return (
    <>
      {orderShapeLoading || orderDetailsLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={orderShapeLoading || orderDetailsLoading}
        >
          <Spinner />
        </Backdrop>
      ) : (
        <TrackMap data={orderDetails?.data.content} routePoints={orderDetails?.data.content.route} shape={orderShape?.data?.content[0]?.shape} />
      )}
    </>
  );
};

export default OrderTrackContainer;
