import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { FormikProps } from "formik";
import { useDarkMode } from "../../context/DarkMode";

const SelectInput = <T extends Record<string, unknown>>({
  formik,
  label,
  name,
  options,
}: SelectInputProps<T>) => {
  const { darkMode } = useDarkMode();
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ mb: "20px" }}>
        <FormControl
          fullWidth
          error={Boolean(formik.touched[name] && formik.errors[name])}
        >
          <InputLabel>{label}</InputLabel>
          <Select
            name={name}
            label={label}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={Boolean(formik.touched[name] && formik.errors[name])}
            onBlur={formik.handleBlur}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option.value}>
                {option.key}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {formik.touched[name] && formik.errors[name]
              ? formik.errors[name]?.toString()
              : ""}
          </FormHelperText>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

type SelectInputProps<T> = {
  formik: FormikProps<T>;
  label: string;
  name: string;
  options: {
    value: string;
    key: string;
  }[];
};

export default SelectInput;
