import { useDarkMode } from "../../../context/DarkMode";
import {
  Autocomplete,
  Box,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Option } from "../types/optionsLocationsType";
import { SyntheticEvent, useEffect, useState } from "react";
import usePlacesQuery from "../hooks/usePlacesQuery";
import useOptionsLocationsMapper from "../hooks/useOptionsLocationsMapper";

const SearchLocation = ({ label, setValue }: SearchLocationProps) => {
  const { darkMode } = useDarkMode();
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  const [inputValue, setInputValue] = useState("");
  const { data, isLoading, refetch, isFetching } = usePlacesQuery(inputValue);
  const { options } = useOptionsLocationsMapper({
    data: data?.data.content,
    inputValue,
  });

  useEffect(() => {
    if (inputValue.length >= 2) {
      refetch();
    }
  }, [inputValue, refetch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ mb: "20px" }}>
        <Autocomplete
          loading={isLoading || isFetching}
          freeSolo
          filterOptions={(options) => options}
          options={options}
          getOptionLabel={(option) => (option as Option).description}
          onChange={(
            _event: SyntheticEvent<Element, Event>,
            newValue: Option | null | string
          ) => {
            setValue(newValue as Option);
          }}
          onInputChange={(_event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              sx={{
                "& input , & label": {
                  fontSize: "14px",
                },
              }}
            />
          )}
        />
      </Box>
    </ThemeProvider>
  );
};

type SearchLocationProps = {
  label: string;
  setValue: React.Dispatch<React.SetStateAction<Option>>;
};

export default SearchLocation;
