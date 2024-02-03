import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkMode.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </BrowserRouter>
);