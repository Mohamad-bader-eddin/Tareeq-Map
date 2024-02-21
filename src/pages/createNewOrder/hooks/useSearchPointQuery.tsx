import { useQuery } from "react-query";
import axiosInstance from "../../../auth/axiosUtils";

const useSearchPointQuery = (placeId: string) => {
  const fetchSearchPoint = () => {
    return axiosInstance.get(`/api/client/placeInfo?place_id=${placeId}`);
  };
  return useQuery(["search-point", placeId], fetchSearchPoint, {
    enabled: false,
    cacheTime: 1,
  });
};

export default useSearchPointQuery;
