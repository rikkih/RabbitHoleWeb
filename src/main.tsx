import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")!).render(
  <Auth0Provider
    domain="REDACTED"
    clientId="REDACTED"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://REDACTED/api/v2/",
    }}
  >
    <App />
  </Auth0Provider>
);
