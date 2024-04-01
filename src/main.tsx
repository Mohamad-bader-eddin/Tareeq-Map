import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkMode.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </HashRouter>
);
