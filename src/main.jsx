import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MediaContextProvider from "./Context/MediaContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MediaContextProvider>
        <App />
      </MediaContextProvider>
    </BrowserRouter>
  </StrictMode>
);
