import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import AuthProvider from "./contexts/AuthProvider/AuthProvider";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import ExploreContainer from "./Pages/Explore/ExploreContainer/ExploreContainer";
import HomeContainer from "./Pages/Home/HomeContainer/HomeContainer";
import Login from "./Pages/Login/Login/Login";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";
import Register from "./Pages/Login/Register/Register";
import Purchase from "./Pages/Purchase/Purchase";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomeContainer />
            </Route>
            <Route path="/home">
              <HomeContainer />
            </Route>
            <Route path="/explore">
              <ExploreContainer />
            </Route>
            <PrivateRoute path="/purchase/:name">
              <Purchase />
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/register">
              <Register />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
