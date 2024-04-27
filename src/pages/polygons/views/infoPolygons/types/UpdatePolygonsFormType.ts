import { FormikHelpers } from "formik";
import * as Yup from "yup";

export type Location = {
    id?: string;
    latitude: number;
    longitude: number;
    zone_id?: string;
}

export type initialValuesType = {
    locations: Location[];
    file: File | undefined;
};

export type validationSchemaType = Yup.ObjectSchema<{
    file: unknown;
}, Yup.AnyObject, {
    file: undefined
}, "">


export type onSubmitType = (
    // eslint-disable-next-line no-unused-vars
    values: initialValuesType,
    // eslint-disable-next-line no-unused-vars
    formikHelpers: FormikHelpers<initialValuesType>
) => void;

export type UpdatePolygonsFormType = {
    initialValues: initialValuesType;
    validationSchema: validationSchemaType;
    onSubmit: onSubmitType;
};
