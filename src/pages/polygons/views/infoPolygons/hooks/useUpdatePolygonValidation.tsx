import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { useState } from "react";
import { Location } from "../../addPolygons/types/AddPolygonsFormType";
// import useUpdatePolygonQuery from "./useUpdatePolygonQuery";
import { Zone } from "../../addPolygons/types/PolygonsTypes";
import { initialValuesType } from "../types/UpdatePolygonsFormType";
import useUploadPolygonFileQuery from "./useUploadPolygonFileQuery";

const useUpdatePolygonValidation = ({
  data,
  id,
}: {
  data: Zone;
  id: string;
}) => {
  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openSucsses, setOpenSucsses] = useState(false);
  const [msg, setMsg] = useState("");
  // const { mutate } = useUpdatePolygonQuery(id);
  const { mutate } = useUploadPolygonFileQuery(id);
  const points: Location[] = [];
  data?.polygons.forEach((el) =>
    points.push({
      id: el.id,
      latitude: el.lat,
      longitude: el.long,
      zone_id: el.zone_id,
    })
  );
  const initialValues: initialValuesType = {
    // zone: {
    //   id: data?.id,
    //   name: data?.name,
    // },
    locations: points,
    file: undefined,
  };

  // const validationSchema = Yup.object().shape({
  //   zone: Yup.object()
  //     .shape({
  //       id: Yup.string().required("required"),
  //       name: Yup.string().required("required"),
  //     })
  //     .required("required"),
  // });
  const validationSchema = Yup.object().shape({
    file: Yup.mixed()
      .required("File is required")
      .test("fileType", "Only Excel files are allowed", (value) => {
        if (!value) return true; // No file selected, validation passed
        const file = value as File;
        return file.name.endsWith(".xlsx");
      }),
  });

  const onSubmit = (
    values: initialValuesType,
    formikHelpers: FormikHelpers<initialValuesType>
  ) => {
    // const polygons = values.locations.map((loc) => ({
    //   lat: loc.latitude,
    //   long: loc.longitude,
    //   zone_id: values.zone?.id as string,
    // }));
    mutate(
      {
        file: values?.file as File,
      },
      {
        onSuccess: (response) => {
          setOpenSucsses(true);
          setMsg(response.data.message);
          formikHelpers.setSubmitting(false);
        },
        onError: (error) => {
          const err = error as Error;
          setOpenError(true);
          setErrorMsg(err.message);
          formikHelpers.setSubmitting(false);
        },
      }
    );
  };
  return {
    initialValues,
    onSubmit,
    validationSchema,
    msg,
    openSucsses,
    setOpenSucsses,
    openError,
    errorMsg,
    setOpenError,
  };
};

export default useUpdatePolygonValidation;
