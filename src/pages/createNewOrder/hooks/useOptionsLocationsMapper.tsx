import { Option } from "../types/optionsLocationsType";

const useOptionsLocationsMapper = ({
  data,
  inputValue,
}: {
  data: Option[];
  inputValue: string;
}) => {
  const options: Option[] = [];
  if ((inputValue && inputValue.length < 2) || !inputValue) {
    return { options: [] };
  }
  data?.forEach((el) =>
    options.push({
      description: el.description,
      place_id: el.place_id,
    })
  );
  return { options };
};

export default useOptionsLocationsMapper;
