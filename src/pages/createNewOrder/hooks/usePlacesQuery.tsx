import { useQuery } from "react-query";
import axiosInstance from "../../../auth/axiosUtils";

const usePlacesQuery = (keyword: string) => {
  const fetchPlaces = () => {
    return axiosInstance.get(`/api/client/places?keyword=${keyword}`);
  };
  return useQuery(["Places", keyword], fetchPlaces, {
    enabled: false,
    cacheTime: 0,
  });
};

export default usePlacesQuery;
