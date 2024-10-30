import { QueryKey, useQuery } from "react-query";
import axiosInstance from "../../../auth/axiosUtils";

const fetchDetailsOrder = ({ queryKey }: { queryKey: QueryKey }) => {
  const orderId = queryKey[1];
  return axiosInstance.get(`/api/admin/order/details/${orderId}`);
};

const useOrderTrackDetailsQury = (orderId: string) => {
  return useQuery(["Order-details", orderId], fetchDetailsOrder);
};

export default useOrderTrackDetailsQury;
