import { useQuery } from "react-query";
import axiosInstance from "../../auth/axiosUtils";

const useVehiclesQuery = () => {
  const fetchVehicles = () => {
    return axiosInstance.get("/api/admin/vehicle-type");
  };
  return useQuery("Vehicles", fetchVehicles);
};

export default useVehiclesQuery;
