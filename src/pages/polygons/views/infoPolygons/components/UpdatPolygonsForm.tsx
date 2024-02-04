import { Form, Formik } from "formik";
import useZoneQuery from "../../../../../share/hooks/useZoneQuery";
import useZoneMaper from "../../../../../share/hooks/useZoneMaper";
import AutocompleteInput from "../../../../../share/autoComplete/AutocompleteInput";
import SubmitButton from "../../../../../share/submitButton/SubmitButton";
import { AddPolygonsFormType } from "../../addPolygons/types/AddPolygonsFormType";
import UpdatePolygonsMap from "./UpdatePolygonsMap";

const UpdatPolygonsForm = ({
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
            <UpdatePolygonsMap formik={formik} />
            <SubmitButton
              name={"Edit"}
              disabled={!formik.isValid || formik.isSubmitting}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdatPolygonsForm;
