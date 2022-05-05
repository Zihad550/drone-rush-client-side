import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "../../contexts/AuthProvider/AuthProvider";
import Footer from "../Shared/Footer/Footer";
import Navigation from "../Shared/Navigation/Navigation";
import Login from "./Authentication/Login/Login";
import PrivateRoute from "./Authentication/PrivateRoute/PrivateRoute";
import Register from "./Authentication/Register/Register";
import Dashboard from "./Dashboard/Dashboard";
import ExploreContainer from "./Explore/ExploreContainer/ExploreContainer";
import ContactUs from "./Home/ContactUs/ContactUs";
import HomeContainer from "./Home/HomeContainer/HomeContainer";
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
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* home page */}
            <Route path="/" element={ <><Navigation />
              <HomeContainer />
              <Footer />
              </>
            }/>
             
            {/* home page */}
            <Route path="/home" element={<> <Navigation />
              <HomeContainer />
              <Footer /></>} />
             
            {/* contact us page */}
            <Route path="/contactUs" element={<><Navigation />
              <ContactUs />
              <Footer /></>}/>
              
            {/* explore page */}
            <Route path="/explore" element={<><Navigation />
              <ExploreContainer />
              <Footer /></>} />
              
            {/* purchase */}
            <Route path="/purchase/:name" element={<PrivateRoute><Purchase /></PrivateRoute>} />
              
            {/* dashboard */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />

            {/* login */}
            <Route path="/login" element={<><Navigation />
<Login />
<Footer /></>} />

          {/* register */}
            <Route path="/register" element={<><Navigation />
              <Register />
              <Footer /></>} />
              

            {/* not fount */}
            <Route path="*">
              <NotFound />
            </Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
