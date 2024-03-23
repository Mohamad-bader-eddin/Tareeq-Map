import {
  Autocomplete,
  Box,
  // CircularProgress,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { FormikProps } from "formik";
import { SyntheticEvent } from "react";
import { useDarkMode } from "../../context/DarkMode";

const AutocompleteInput = <T extends Record<string, unknown>>({
  options,
  label,
  formik,
  name,
  loading,
}: AutocompleteInputType<T>) => {
  const { darkMode } = useDarkMode();
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ mb: "20px" }}>
        <Autocomplete
          loading={loading}
          // freeSolo
          // disableClearable
          value={formik.values[name]}
          options={options}
          getOptionLabel={(option) => (option as Option).name}
          onChange={(
            _event: SyntheticEvent<Element, Event>,
            newValue: unknown | null
          ) => {
            formik.setFieldValue(name, newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              name={name}
              error={Boolean(formik.touched[name] && formik.errors[name])}
              onBlur={formik.handleBlur}
              helperText={
                formik.touched[name] && formik.errors[name] ? (
                  <>{formik.errors[name]}</>
                ) : null
              }
              // InputProps={{
              //   ...params.InputProps,
              //   type: "search",
              //   endAdornment: (
              //     <>
              //       {loading ? (
              //         <CircularProgress color="inherit" size={20} />
              //       ) : null}
              //       {params.InputProps.endAdornment}
              //     </>
              //   ),
              // }}
            />
          )}
        />
      </Box>
    </ThemeProvider>
  );
};

type AutocompleteInputType<T> = {
  options: Option[];
  label: string;
  formik: FormikProps<T>;
  name: string;
  loading: boolean;
};

type Option = {
  id: string;
  name: string;
};

export default AutocompleteInput;
