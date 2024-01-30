import * as Yup from "yup";
import { FormikHelpers } from "formik";
import { Location, initialValuesType } from "../types/AddPolygonsFormType";
import { useState } from "react";
import useAddPolugonQuery from "./useAddPolugonQuery";

const useAddPolygonValidation = () => {
  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openSucsses, setOpenSucsses] = useState(false);
  const [msg, setMsg] = useState("");
  const { mutate } = useAddPolugonQuery();
  const initialValues: initialValuesType = {
    zone: null,
    locations: [{} as Location],
  };

  const validationSchema = Yup.object().shape({
    zone: Yup.object()
      .shape({
        id: Yup.string().required("required"),
        name: Yup.string().required("required"),
      })
      .required("required"),
  });

  const onSubmit = (
    values: initialValuesType,
    formikHelpers: FormikHelpers<initialValuesType>
  ) => {
    const polygons = values.locations.map((loc) => ({
      lat: loc.latitude,
      long: loc.longitude,
      zone_id: values.zone?.id as string,
    }));
    mutate(
      {
        polygons,
      },
      {
        onSuccess: (response) => {
          setOpenSucsses(true);
          setMsg(response.data.message);
          formikHelpers.setSubmitting(false);
          formikHelpers.resetForm();
        },
        onError: (error) => {
          const err = error as Error;
          setOpenError(true);
          setErrorMsg(err.message);
          formikHelpers.setSubmitting(false);
        },
      }
    );
    console.log("Form Data :", polygons);
    formikHelpers.resetForm();
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

export default useAddPolygonValidation;
