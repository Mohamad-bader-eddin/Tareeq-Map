import { Form, Formik } from "formik";
import { CourierOnDemandFormType } from "../types/CourierOnDemandFormType";
import { Box } from "@mui/material";
import SubmitButton from "../../../share/submitButton/SubmitButton";
import SelectInput from "../../../share/select/SelectInput";
import CreateOrderMap from "./CreateOrderMap";
import { useState } from "react";
import SearchLocation from "./SearchLocation";
import AutocompleteInput from "../../../share/autoComplete/AutocompleteInput";
import useVehiclesQuery from "../../../share/hooks/useVehiclesQuery";
import useVehiclesMapper from "../../../share/hooks/useVehiclesMapper";
const CourierOnDemandForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  destinationLocation,
  destinationMarker,
  setDestinationLocation,
  setDestinationMarker,
  setSourceLocation,
  setSourceMarker,
  sourceLocation,
  sourceMarker,
}: CourierOnDemandFormType) => {
  const [isValidSourceLocation, setIsValidSourceLocation] = useState(false);
  const [isValidDestinationLocation, setIsValidDestinationLocation] =
    useState(false);
  const { data, isLoading } = useVehiclesQuery();
  const { vehiclesOptions } = useVehiclesMapper({
    data: data?.data.content,
  });

  const options = [
    {
      value: "true",
      key: "schedule",
    },
    {
      value: "false",
      key: "now",
    },
  ];

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <SearchLocation
              label="Source Location"
              setValue={setSourceLocation}
            />
            <Box sx={{ mb: "20px" }}>
              <CreateOrderMap
                marker={sourceMarker}
                setMarker={setSourceMarker}
                placeId={sourceLocation?.place_id}
                setIsValid={setIsValidSourceLocation}
              />
            </Box>
            <SearchLocation
              label="Destination Location"
              setValue={setDestinationLocation}
            />
            <Box sx={{ mb: "20px" }}>
              <CreateOrderMap
                marker={destinationMarker}
                setMarker={setDestinationMarker}
                placeId={destinationLocation?.place_id}
                setIsValid={setIsValidDestinationLocation}
              />
            </Box>
            <SelectInput
              formik={formik}
              label={"Send To Active Orders"}
              name="sendToActiveOrders"
              options={options}
            />
            <AutocompleteInput
              formik={formik}
              label={"Vehicle Type"}
              name="vehicleType"
              options={vehiclesOptions}
              loading={isLoading}
            />
            <Box sx={{ width: "200px" }}>
              <SubmitButton
                name={"Add"}
                disabled={
                  !formik.isValid ||
                  isValidSourceLocation ||
                  isValidDestinationLocation ||
                  formik.isSubmitting
                }
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CourierOnDemandForm;
