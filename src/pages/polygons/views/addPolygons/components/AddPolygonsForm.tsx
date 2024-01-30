import { Form, Formik } from "formik";
import { AddPolygonsFormType } from "../types/AddPolygonsFormType";
import useZoneQuery from "../../../../../share/hooks/useZoneQuery";
import useZoneMaper from "../../../../../share/hooks/useZoneMaper";
import AutocompleteInput from "../../../../../share/autoComplete/AutocompleteInput";
import PolygonsMap from "./PolygonsMap";
import SubmitButton from "../../../../../share/submitButton/SubmitButton";

const AddPolygonsForm = ({
  initialValues,
  onSubmit,
  validationSchema,
}: AddPolygonsFormType) => {
  const { data, isLoading } = useZoneQuery();
  const { options } = useZoneMaper({ data: data?.data.content });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <AutocompleteInput
              formik={formik}
              label={"Zone"}
              name="zone"
              options={options}
              loading={isLoading}
            />
            <PolygonsMap formik={formik} />
            <SubmitButton
              name={"Add"}
              disabled={!formik.isValid || formik.isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPolygonsForm;
