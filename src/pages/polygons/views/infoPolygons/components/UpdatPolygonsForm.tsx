import { Form, Formik } from "formik";
// import useZoneQuery from "../../../../../share/hooks/useZoneQuery";
// import useZoneMaper from "../../../../../share/hooks/useZoneMaper";
// import AutocompleteInput from "../../../../../share/autoComplete/AutocompleteInput";
// import SubmitButton from "../../../../../share/submitButton/SubmitButton";
// import { AddPolygonsFormType } from "../../addPolygons/types/AddPolygonsFormType";
import UpdatePolygonsMap from "./UpdatePolygonsMap";
// import { Box } from "@mui/material";
import { UpdatePolygonsFormType } from "../types/UpdatePolygonsFormType";
// import UploadExcelButton from "./UploadExcelButton";

const UpdatPolygonsForm = ({
  initialValues,
  validationSchema,
  onSubmit,
}: UpdatePolygonsFormType) => {
  // const { data, isLoading } = useZoneQuery();
  // const { options } = useZoneMaper({ data: data?.data.content });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            {/* <AutocompleteInput
              formik={formik}
              label={"Zone"}
              name="zone"
              options={options}
              loading={isLoading}
            /> */}
            <UpdatePolygonsMap formik={formik} />
            {/* <UploadExcelButton
              formik={formik}
              name="file"
              title="Upload File"
            /> */}
            {/* <Box sx={{ width: "200px" }}>
              <SubmitButton
                name={"Edit"}
                disabled={!formik.isValid || formik.isSubmitting}
              />
            </Box> */}
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdatPolygonsForm;
