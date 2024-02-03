import { QueryClient, QueryClientProvider } from "react-query";
import AddPolygonsContainer from "./pages/polygons/views/addPolygons/container/AddPolygonsContainer";
import { ThemeProvider } from "styled-components";
import { theme } from "./share/utils/theme";
import { useDarkMode } from "./context/DarkMode";
import { CssBaseline } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import OrderTrackContainer from "./pages/orderTrack/container/OrderTrackContainer";

function getCookie(cookieName: string) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");

  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null; // Cookie not found
}

const queryClient = new QueryClient();
function App() {
  console.log(getCookie("accessToken"));

  const { setDarkMode } = useDarkMode();
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
            path="/admin/track-order/:id"
            element={<OrderTrackContainer />}
          />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
