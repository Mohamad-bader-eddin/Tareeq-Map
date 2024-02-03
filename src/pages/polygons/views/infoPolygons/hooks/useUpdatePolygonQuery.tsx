import { useMutation } from "react-query";
import axiosInstance from "../../../../../auth/axiosUtils";
import { PolygonsStore } from "../../addPolygons/types/PolygonsTypes";

const useUpdatePolygonQuery = (id: string) => {
  const updatePolygon = (polygon: PolygonsStore) => {
    return axiosInstance.post(`/api/admin/polygon/${id}`, polygon);
  };

  return useMutation(updatePolygon);
};

export default useUpdatePolygonQuery;
