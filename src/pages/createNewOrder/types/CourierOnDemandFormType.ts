import { FormikHelpers } from "formik";
import * as Yup from "yup";
import { Pin } from "./createOrderType";
import { Option as LocationOption } from "./optionsLocationsType";

type Option = {
    id: string;
    name: string;
};

export type initialValuesType = {
    vehicleType: Option | null;
    sendToActiveOrders?: Option | null;
    order_date?: Date | null
}

export type validationSchemaType = Yup.ObjectSchema<{
    vehicleType: {
        name: string;
        id: string;
    };
}, Yup.AnyObject, {
    vehicleType: {
        id: undefined;
        name: undefined;
    };
}, "">

// eslint-disable-next-line no-unused-vars
export type onSubmitType = (values: initialValuesType, formikHelpers: FormikHelpers<initialValuesType>) => void


export type CourierOnDemandFormType = {
    initialValues: initialValuesType;
    validationSchema: validationSchemaType;
    onSubmit: onSubmitType
    sourceMarker: Pin
    setSourceMarker: React.Dispatch<React.SetStateAction<Pin>>
    destinationMarker: Pin
    setDestinationMarker: React.Dispatch<React.SetStateAction<Pin>>
    sourceLocation: LocationOption
    setSourceLocation: React.Dispatch<React.SetStateAction<LocationOption>>
    destinationLocation: LocationOption
    setDestinationLocation: React.Dispatch<React.SetStateAction<LocationOption>>
}