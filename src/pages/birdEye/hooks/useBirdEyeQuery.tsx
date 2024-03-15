import { useQuery } from "react-query";
import axiosInstance from "../../../auth/axiosUtils";

const fetchBirdEye = () => {
  return axiosInstance.get("/api/admin/driver/birdEye");
};

const useBirdEyeQuery = () => {
  return useQuery("bird-eye", fetchBirdEye);
};

export default useBirdEyeQuery;
