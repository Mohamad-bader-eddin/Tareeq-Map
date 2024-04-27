import { useMutation } from "react-query";
import axiosMultipart from "../../../../../auth/axiosMultipart";

const useUploadPolygonFileQuery = (id: string) => {
  const uploadFile = ({ file }: { file: File }) => {
    const formData = new FormData();
    formData.append("file", file);
    return axiosMultipart.post(`/${id}`, formData);
  };
  return useMutation(uploadFile);
};

export default useUploadPolygonFileQuery;
