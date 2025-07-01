import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { RouterProvider } from "react-router";
import router from "./routes/index.tsx";
import { CssBaseline } from "@mui/material";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/lib/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>,
);
