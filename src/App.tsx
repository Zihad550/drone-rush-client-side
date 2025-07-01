import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Suspense } from "react";
import "react-phone-number-input/style.css";
import Spinner from "./components/Shared/Spinner";
import { Outlet } from "react-router";

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
  return (
    <Suspense fallback={<Spinner />}>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
