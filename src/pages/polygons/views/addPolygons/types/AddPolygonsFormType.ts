import { FormikHelpers } from "formik";
import * as Yup from "yup";


type Option = {
    id: string;
    name: string;
};

export type Location = {
    id?: string;
    latitude: number;
    longitude: number;
    zone_id?: string;
}

export type initialValuesType = {
    zone: Option | null;
    locations: Location[];
};

export type validationSchemaType = Yup.ObjectSchema<{
    zone: {
        name: string;
        id: string;
    };
    // locations: {
    //     latitude: number;
    //     longitude: number;
    // }[] | undefined;
}, Yup.AnyObject, {
    zone: {
        id: undefined;
        name: undefined;
    };
    // locations: "";
}, "">

export type onSubmitType = (
    // eslint-disable-next-line no-unused-vars
    values: initialValuesType,
    // eslint-disable-next-line no-unused-vars
    formikHelpers: FormikHelpers<initialValuesType>
) => void;

export type AddPolygonsFormType = {
    initialValues: initialValuesType;
    validationSchema: validationSchemaType;
    onSubmit: onSubmitType;
};

type LocationError = {
    latitude?: string;
    longitude?: string;
}

export type AddPolygonsFormError = {
    zone: string;
    locations: LocationError[];
}

export type Markers = {
    id: string;
    position: google.maps.LatLngLiteral;
};
