import { useMutation } from "react-query";
import axiosInstance from "../../../auth/axiosUtils";
import { NewOreder } from "../types/createOrderType";

const useAddOrderQuery = () => {
  const addOrder = (order: NewOreder) => {
    return axiosInstance.post("/api/admin/order/store", order);
  };
  return useMutation(addOrder);
};

export default useAddOrderQuery;
