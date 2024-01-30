import { useMutation } from "react-query";
import axiosInstance from "../../../../../auth/axiosUtils";

const addPolygon = (polygon: PolygonsStore) => {
  return axiosInstance.post("/api/admin/polygon/store", polygon);
};

const useAddPolugonQuery = () => {
  return useMutation(addPolygon);
};

type PolygonStore = {
  lat: number;
  long: number;
  zone_id: string;
};

type PolygonsStore = {
  polygons: PolygonStore[];
};

export default useAddPolugonQuery;
