import { useMutation } from "react-query";
import axiosInstance from "../../../auth/axiosUtils";
import { Point } from "../types/createOrderType";

const usePointValidateQuery = () => {
  const fetchPointValid = (point: Point) => {
    return axiosInstance.get(
      `/api/admin/pointInSidePolygon?lat=${point.lat}&long=${point.long}`
    );
  };
  return useMutation(fetchPointValid);
};

export default usePointValidateQuery;
