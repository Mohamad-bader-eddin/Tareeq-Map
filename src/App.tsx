import { QueryClient, QueryClientProvider } from "react-query";
import AddPolygonsContainer from "./pages/polygons/views/addPolygons/container/AddPolygonsContainer";
import { ThemeProvider } from "styled-components";
import { theme } from "./share/utils/theme";
import { useDarkMode } from "./context/DarkMode";
import { CssBaseline } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import OrderTrackContainer from "./pages/orderTrack/container/OrderTrackContainer";
import InfoPolygonsContainer from "./pages/polygons/views/infoPolygons/container/InfoPolygonsContainer";
import CourierOnDemandContainer from "./pages/createNewOrder/container/CourierOnDemandContainer";
import { useWindowFocused } from "./context/WindowFocused";
import BirdEyeContainer from "./pages/birdEye/container/BirdEyeContainer";

const queryClient = new QueryClient();
function App() {
  const { setDarkMode } = useDarkMode();
  const { setIsWindowFocused } = useWindowFocused();
  useEffect(() => {
    // Listen for messages from the parent window
    const handleMessage = (event: MessageEvent) => {
      const { darkMode } = event.data;
      setDarkMode(darkMode);
    };

    window.addEventListener("message", handleMessage);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setDarkMode]);

  window.onfocus = () => {
    setIsWindowFocused(true);
  };

  window.onblur = () => {
    setIsWindowFocused(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route
            path="/"
            element={
              <Navigate to="/admin/coverage/add-polygons-map" replace={true} />
            }
          />
          <Route
            path="/admin/coverage/add-polygons-map"
            element={<AddPolygonsContainer />}
          />
          <Route
            path="/admin/coverage/polygons"
            element={<InfoPolygonsContainer />}
          />
          <Route path="/admin/track-order" element={<OrderTrackContainer />} />
          <Route
            path="/admin/create-order"
            element={<CourierOnDemandContainer />}
          />
          <Route path="/admin/bird-eye" element={<BirdEyeContainer />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
