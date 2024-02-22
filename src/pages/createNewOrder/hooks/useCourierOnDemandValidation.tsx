import { FormikHelpers } from "formik";
import { initialValuesType } from "../types/CourierOnDemandFormType";
import * as Yup from "yup";
import { Pin } from "../types/createOrderType";
import { useState } from "react";
import useAddOrderQuery from "./useAddOrderQuery";
import { errorMessage } from "../../../share/utils/getErrorMessage";

const useCourierOnDemandValidation = ({
  destinationMarker,
  sourceMarker,
  userId,
}: useCourierOnDemandValidationProps) => {
  const [openError, setOpenError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [openSucsses, setOpenSucsses] = useState(false);
  const [msg, setMsg] = useState("");
  const { mutate } = useAddOrderQuery();
  const initialValues = {
    sendToActiveOrders: {
      id: "false",
      name: "now",
    },
    vehicleType: null,
    order_date: null,
  };

  const validationSchema = Yup.object().shape({
    vehicleType: Yup.object()
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
    mutate(
      {
        is_schedule: values.sendToActiveOrders?.id === "true" ? true : false,
        vehicle_type_id: values.vehicleType?.id as string,
        order_date: values.order_date?.toString(),
        user_id: userId,
        address_points: [
          {
            name: "Damascus",
            address: "Damascus",
            lat: sourceMarker.position.lat,
            long: sourceMarker.position.lng,
          },
          {
            name: "Damascus",
            address: "Damascus",
            lat: destinationMarker.position.lat,
            long: destinationMarker.position.lng,
          },
        ],
      },
      {
        onSuccess: (response) => {
          setOpenSucsses(true);
          setMsg(response.data.message);
          formikHelpers.setSubmitting(false);
          formikHelpers.resetForm();
        },
        onError: (error) => {
          setOpenError(true);
          setErrorMsg(errorMessage(error));
          formikHelpers.setSubmitting(false);
        },
      }
    );
    // console.log("Form Data :", values);
    // formikHelpers.resetForm();
  };
  return {
    initialValues,
    validationSchema,
    onSubmit,
    msg,
    openSucsses,
    setOpenSucsses,
    openError,
    errorMsg,
    setOpenError,
  };
};

type useCourierOnDemandValidationProps = {
  sourceMarker: Pin;
  destinationMarker: Pin;
  userId: string;
};

export default useCourierOnDemandValidation;
