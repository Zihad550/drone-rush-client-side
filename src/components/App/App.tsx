import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "components/Shared/Footer";
import Header from "components/Shared/Header";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  adminRoutes,
  generalRoutes,
  protectedRoutes,
  userRoutes,
} from "routes/routes";
import Spinner from "../Shared/Spinner";
import "./App.css";
import AdminRoute from "./Authentication/AdminRoute";
import PrivateRoute from "./Authentication/PrivateRoute";

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "'Courgette', cursive",
      fontSize: "3.8rem",
      borderBottom: "1px solid black",
      width: "max-content",
    },
    h2: {
      fontSize: "2.2rem",
      fontWeight: "500",
    },
  },
  palette: {
    primary: {
      main: "#4fc4cf",
    },
  },
});

const App = () => (
  <Suspense fallback={<Spinner />}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* general routes */}
          {generalRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <>
                  <Header /> <route.element /> <Footer />
                </>
              }
            />
          ))}

          {/* private routes */}
          {protectedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  <>
                    <Header />
                    <route.element />
                    <Footer />
                  </>
                </PrivateRoute>
              }
            />
          ))}

          {/* user dashboard routes */}
          {userRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute>
                  <route.element />
                </PrivateRoute>
              }
            />
          ))}

          {/* admin dashboard routes */}
          {adminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <AdminRoute>
                  <route.element />
                </AdminRoute>
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </Suspense>
);

export default App;
