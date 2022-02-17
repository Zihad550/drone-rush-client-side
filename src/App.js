import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import ExploreContainer from "./Pages/Explore/ExploreContainer/ExploreContainer";
import ContactUs from "./Pages/Home/ContactUs/ContactUs";
import HomeContainer from "./Pages/Home/HomeContainer/HomeContainer";
import Login from "./Pages/Login/Login/Login";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import Register from "./Pages/Login/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Purchase from "./Pages/Purchase/Purchase";
import Footer from "./Pages/Shared/Footer/Footer";
import Navigation from "./Pages/Shared/Navigation/Navigation";

const theme = createTheme({
  typography: {
    h1: {
      fontFamily: "'Courgette', cursive",
      fontSize: "3.8rem",
      borderBottom: "1px solid black",
      width: "max-content",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Navigation />
              <HomeContainer />
              <Footer />
            </Route>
            <Route path="/home">
              <Navigation />
              <HomeContainer />
              <Footer />
            </Route>
            <Route path="/contactUs">
              <Navigation />
              <ContactUs />
              <Footer />
            </Route>
            <Route path="/explore">
              <Navigation />
              <ExploreContainer />
              <Footer />
            </Route>

            <PrivateRoute path="/purchase/:name">
              <Purchase />
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/login">
              <Navigation />
              <Login />
              <Footer />
            </Route>

            <Route path="/register">
              <Navigation />
              <Register />
              <Footer />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
