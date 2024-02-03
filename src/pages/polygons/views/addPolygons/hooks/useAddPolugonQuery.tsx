import { useMutation } from "react-query";
import axiosInstance from "../../../../../auth/axiosUtils";
import { PolygonsStore } from "../types/PolygonsTypes";

const addPolygon = (polygon: PolygonsStore) => {
  return axiosInstance.post("/api/admin/polygon/store", polygon);
};

const useAddPolugonQuery = () => {
  return useMutation(addPolygon);
};

export default useAddPolugonQuery;
