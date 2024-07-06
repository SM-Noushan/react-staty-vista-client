import ReactDOM from "react-dom/client";
import { router } from "./routes/Routes";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import AuthProvider from "./providers/AuthProvider";

import "./index.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  </HelmetProvider>
);
