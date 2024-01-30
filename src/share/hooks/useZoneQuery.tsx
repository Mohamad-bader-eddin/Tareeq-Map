import { useQuery } from "react-query";
import axiosInstance from "../../auth/axiosUtils";

const fetchZones = () => {
  return axiosInstance.get("/api/admin/zone");
};

const useZoneQuery = () => {
  return useQuery("Zones", fetchZones);
};

export default useZoneQuery;
