import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../../contexts/AuthProvider/AuthProvider";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";
import AboutUs from "./AboutUs/AboutUs";
import "./App.css";
import Login from "./Authentication/Login/Login";
import PrivateRoute from "./Authentication/PrivateRoute/PrivateRoute";
import Register from "./Authentication/Register/Register";
import Cart from "./Cart";
import ContactUs from "./ContactUs";
import AddDrone from "./Dashboard/AddDrone/AddDrone";
import Dashboard from "./Dashboard/Dashboard";
import MakeAdmin from "./Dashboard/MakeAdmin/MakeAdmin";
import ManageAllOrders from "./Dashboard/ManageAllOrders/ManageAllOrders";
import ManageDrones from "./Dashboard/ManageDrones/ManageDrones";
import MyOrders from "./Dashboard/MyOrders/MyOrders";
import Pay from "./Dashboard/Pay/Pay";
import Purchased from "./Dashboard/Purchased/Purchased";
import Details from "./Details";
import Explore from "./Explore";
import Home from "./Home/Home";
import NotFound from "./NotFound/NotFound";
import Purchase from "./Purchase/Purchase";

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

/**
 *
 * @returns jsx elements
 */

const App = () => (
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* home page */}
          <Route
            path="/"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />

          {/* home page */}
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Home />
                <Footer />
              </>
            }
          />

          {/* contact us page */}
          <Route
            path="/contactUs"
            element={
              <>
                <Header />
                <ContactUs />
                <Footer />
              </>
            }
          />
          {/* about us page */}
          <Route path="/aboutUs" element={<AboutUs />} />

          {/* explore page */}
          <Route
            path="/explore"
            element={
              <>
                <Header />
                <Explore />
                <Footer />
              </>
            }
          />

          {/* purchase */}
          <Route
            path="/purchase/:name"
            element={
              <PrivateRoute>
                <Purchase />
              </PrivateRoute>
            }
          />
          {/* purchase */}
          <Route path="/details/:id" element={<Details />} />

          {/* cart */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          {/* dashboard */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* normal user dashboard routes */}
            <Route path="/dashboard/pay" element={<Pay />} />
            <Route path="/dashboard/myOrders" element={<MyOrders />} />
            <Route path="/dashboard/review" element={<Purchased />} />

            {/* admin dashboard routes */}
            <Route path="/dashboard/makeAdmin" element={<MakeAdmin />} />
            <Route path="/dashboard/addDrone" element={<AddDrone />} />
            <Route path="/dashboard/manageDrones" element={<ManageDrones />} />
            <Route
              path="/dashboard/manageOrders"
              element={<ManageAllOrders />}
            />
          </Route>

          {/* login */}
          <Route
            path="/login"
            element={
              <>
                <Header />
                <Login />
                <Footer />
              </>
            }
          />

          {/* register */}
          <Route
            path="/register"
            element={
              <>
                <Header />
                <Register />
                <Footer />
              </>
            }
          />

          {/* not fount */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
