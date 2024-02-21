import { Box, TextField, ThemeProvider, createTheme } from "@mui/material";
import { FormikProps } from "formik";
import { useDarkMode } from "../../context/DarkMode";

const Input = <T extends Record<string, unknown>>({
  formik,
  label,
  name,
  type,
  textarea,
  value,
  error,
  helperText,
  step,
}: InputProps<T>) => {
  const { darkMode } = useDarkMode();
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ mb: "20px" }}>
        <TextField
          error={
            error ? error : Boolean(formik.touched[name] && formik.errors[name])
          }
          label={label}
          name={name}
          type={type ? type : "text"}
          onChange={formik.handleChange}
          value={value ? value : formik.values[name]}
          onBlur={formik.handleBlur}
          helperText={
            helperText ? (
              helperText
            ) : formik.touched[name] && formik.errors[name] ? (
              <>{formik.errors[name]}</>
            ) : null
          }
          inputProps={{
            step: step ? step : "",
          }}
          multiline={textarea}
          rows={textarea ? 4 : 0}
          variant="outlined"
          sx={{ width: "100%" }}
        />
      </Box>
    </ThemeProvider>
  );
};

type InputProps<T> = {
  formik: FormikProps<T>;
  label: string;
  name: string;
  type?: "text" | "email" | "number";
  textarea?: boolean;
  value?: string | number;
  error?: boolean;
  helperText?: string;
  step?: number;
};

export default Input;
