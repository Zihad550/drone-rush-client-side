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
            {/* home page */}
            <Route exact path="/">
              <Navigation />
              <HomeContainer />
              <Footer />
            </Route>

            {/* home page */}
            <Route path="/home">
              <Navigation />
              <HomeContainer />
              <Footer />
            </Route>

            {/* contact us page */}
            <Route path="/contactUs">
              <Navigation />
              <ContactUs />
              <Footer />
            </Route>

            {/* explore page */}
            <Route path="/explore">
              <Navigation />
              <ExploreContainer />
              <Footer />
            </Route>

            {/* purchase */}
            <PrivateRoute path="/purchase/:name">
              <Purchase />
            </PrivateRoute>

            {/* dashboard */}
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>

            {/* login */}
            <Route path="/login">
              <Navigation />
              <Login />
              <Footer />
            </Route>

          {/* register */}
            <Route path="/register">
              <Navigation />
              <Register />
              <Footer />
            </Route>

            {/* not fount */}
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
