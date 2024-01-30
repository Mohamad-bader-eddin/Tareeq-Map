import { QueryClient, QueryClientProvider } from "react-query";
import AddPolygonsContainer from "./pages/polygons/views/addPolygons/container/AddPolygonsContainer";
import { ThemeProvider } from "styled-components";
import { theme } from "./share/utils/theme";
import { useDarkMode } from "./context/DarkMode";
import { CssBaseline } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";

const queryClient = new QueryClient();
function App() {
  const { setDarkMode } = useDarkMode();
  useEffect(() => {
    // Listen for messages from the parent window
    const handleMessage = (event: MessageEvent) => {
      const { darkMode } = event.data;
      setDarkMode(darkMode);
      console.log("Received token:", darkMode);
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
              <Navigate to="/dashboard/coverage/add-polygons" replace={true} />
            }
          />
          <Route
            path="/dashboard/coverage/add-polygons"
            element={<AddPolygonsContainer />}
          />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
