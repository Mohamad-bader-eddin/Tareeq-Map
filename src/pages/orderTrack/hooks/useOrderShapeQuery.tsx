import { QueryKey, useQuery } from "react-query";
import axiosInstance from "../../../auth/axiosUtils";

const fetchOrderShape = ({ queryKey }: { queryKey: QueryKey }) => {
  const orderId = queryKey[1];
  return axiosInstance.get(`/api/admin/routing/orderRoute/${orderId}`);
};

const useOrderShapeQuery = (orderId: string) => {
  return useQuery(["Order-shape", orderId], fetchOrderShape);
};

export default useOrderShapeQuery;