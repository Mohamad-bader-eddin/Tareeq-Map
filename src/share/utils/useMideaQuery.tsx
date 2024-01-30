import { useMediaQuery } from "@mui/material";
import { device } from "./device";

const useMedeaQueries = () => {
  const mobileS = useMediaQuery(device.mobileS);
  const mobileM = useMediaQuery(device.mobileM);
  const mobileL = useMediaQuery(device.mobileL);
  const tablet = useMediaQuery(device.tablet);
  const laptop = useMediaQuery(device.laptop);
  const laptopL = useMediaQuery(device.laptopL);
  return {
    mobileS,
    mobileM,
    mobileL,
    tablet,
    laptop,
    laptopL,
  };
};

export default useMedeaQueries;
