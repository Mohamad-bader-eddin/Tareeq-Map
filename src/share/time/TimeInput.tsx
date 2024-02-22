import { Box, ThemeProvider, createTheme } from "@mui/material";
import { FormikProps } from "formik";
import {
  LocalizationProvider,
  MobileTimePicker,
  TimeValidationError,
} from "@mui/x-date-pickers";
import { useMemo, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useDarkMode } from "../../context/DarkMode";

const TimeInput = <T extends Record<string, unknown>>({
  formik,
  label,
  name,
}: TimeInputType<T>) => {
  const [error, setError] = useState<TimeValidationError | null>(null);
  const { darkMode } = useDarkMode();

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const handleSetValue = (value: Date | null) => {
    // const time = value?.toLocaleTimeString("en-uk", {
    //   hour: "2-digit",
    //   minute: "2-digit",
    //   second: "2-digit",
    //   hourCycle: "h11",
    // });
    // console.log(time);

    formik.setFieldValue(name, value);
  };

  const errorMessage = useMemo(() => {
    switch (error) {
      case "maxTime":
      case "minTime":
      case "invalidDate": {
        return "Your Time is not valid";
      }
      default: {
        return "";
      }
    }
  }, [error]);
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          mb: "20px",
          width: "100%",
          "&>div>div": {
            width: "100%",
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={["MobileDatePicker"]}>
            <MobileTimePicker
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(value: any) => handleSetValue(value as Date)}
              value={formik.values[name]}
              label={label}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onError={(newError: any) => setError(newError)}
              slotProps={{
                textField: {
                  error:
                    Boolean(formik.touched[name] && formik.errors[name]) ||
                    Boolean(errorMessage),
                  helperText:
                    formik.touched[name] && formik.errors[name] ? (
                      <>{formik.errors[name]}</>
                    ) : (
                      errorMessage
                    ),
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Box>
    </ThemeProvider>
  );
};

type TimeInputType<T> = {
  formik: FormikProps<T>;
  label: string;
  name: string;
};

export default TimeInput;
