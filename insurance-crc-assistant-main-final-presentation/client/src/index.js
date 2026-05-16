import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ProfileProvider } from "./context/ProfileContext";
import { ThemeProvider } from "./context/ThemeContext";
const root = ReactDOM.createRoot(
  document.getElementById("root")
);

root.render(
  <React.StrictMode>
    <ProfileProvider>
      <ThemeProvider>
      <App />
      </ThemeProvider>
    </ProfileProvider>
  </React.StrictMode>
);
