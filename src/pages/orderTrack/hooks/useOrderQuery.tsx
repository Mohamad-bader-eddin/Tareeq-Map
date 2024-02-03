import { QueryKey, useQuery } from "react-query";
import axiosInstance from "../../../auth/axiosUtils";

const fetchOrder = ({ queryKey }: { queryKey: QueryKey }) => {
  const orderId = queryKey[1];
  return axiosInstance.get(`/api/admin/order/${orderId}`);
};

const useOrderQuery = (orderId: string) => {
  return useQuery(["Order", orderId], fetchOrder);
};

export default useOrderQuery;
