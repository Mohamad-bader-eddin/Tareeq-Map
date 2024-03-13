import { useLocation } from "react-router-dom";
import BirdEyeMap from "../components/BirdEyeMap";

const BirdEyeContainer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  sessionStorage.setItem("token", token as string);
  return <BirdEyeMap />;
};

export default BirdEyeContainer;
