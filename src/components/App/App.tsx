import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "components/Shared/Footer";
import Header from "components/Shared/Header";
import { Suspense } from "react";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppState } from "redux/store";
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
import AdminDashboard from "./Dashboards/AdminDashboard";
import UserDashboard from "./Dashboards/UserDashboard";

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

const App = () => {
  const { data: user } = useSelector((state: AppState) => state.auth);

  return (
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
                    <Header />
                    <route.element />
                    <Footer />
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
            {user?.role === "user" && (
              <Route path="/dashboard" element={<UserDashboard />}>
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
              </Route>
            )}

            {/* admin dashboard routes */}

            {user?.role === "admin" && (
              <Route path="/dashboard" element={<AdminDashboard />}>
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
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
