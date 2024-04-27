import { Box, Button, Stack, Typography } from "@mui/material";
import { FormikProps } from "formik";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import useMedeaQueries from "../../../../../share/utils/useMideaQuery";

const UploadExcelButton = <T extends Record<string, unknown>>({
  formik,
  name,
  title,
}: UploadExcelButton<T>) => {
  const { laptop } = useMedeaQueries();

  return (
    <Box sx={{ mt: "20px" }}>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Button
          component="label"
          variant="outlined"
          endIcon={<FileUploadIcon />}
          size="small"
          sx={{
            fontSize: laptop ? "12px" : "14px",
            ".css-9tj150-MuiButton-endIcon": {
              marginInline: "8px -4px !important",
            },
          }}
        >
          {title}
          <input
            type="file"
            style={{ display: "none" }}
            name={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.currentTarget.files) {
                formik.setFieldValue(name, event.currentTarget.files[0]);
              }
            }}
            accept=".xlsx"
          />
        </Button>
        <Typography variant={laptop ? "caption" : "body2"}>
          {formik.values[name] ? (formik.values[name] as File).name : ""}
        </Typography>
      </Stack>
      <Typography
        variant="body2"
        color="#d32f2f"
        sx={{
          marginInlineStart: "15px",
          mt: "10px",
        }}
      >
        {<>{formik.errors[name]}</>}
      </Typography>
    </Box>
  );
};

type UploadExcelButton<T> = {
  formik: FormikProps<T>;
  name: string;
  title: string;
};

export default UploadExcelButton;
