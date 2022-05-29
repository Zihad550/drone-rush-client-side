import { Email, VpnKey } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import loginImage from "../../../../images/login.jpg";

// types
type LoginData = {
  email: string;
  password: string;
};
const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const { logIn, user, authError, isLoading, loginWithGoogle }: any = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field: string = e.target.name;
    const value: string = e.target.value;
    const newLoginData: any = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn(loginData?.email, loginData?.password, location, navigate);
  };
  return (
    <Container sx={{ my: 5 }}>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        container
        spacing={{ xs: 2, md: 3 }}
      >
        <Grid
          sx={{ display: "flex", flexDirection: "column" }}
          item
          xs={12}
          md={6}
        >
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Typography variant="h6">Login</Typography>
              <form onSubmit={handleLogin}>
                <TextField
                  required
                  sx={{ width: "75%" }}
                  label="Your Email"
                  onChange={handleOnChange}
                  variant="standard"
                  name="email"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />{" "}
                <br />
                <TextField
                  required
                  sx={{ width: "75%" }}
                  onChange={handleOnChange}
                  label="Your Password"
                  margin="normal"
                  variant="standard"
                  type="password"
                  name="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKey />
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <NavLink style={{ textDecoration: "none" }} to="/register">
                  <Button variant="text">New User? Please Register</Button>
                </NavLink>
                <br />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ background: "info.main", mt: 3, width: "75%" }}
                >
                  Login
                </Button>
                {user?.email && (
                  <Alert sx={{ mt: 3 }} severity="success">
                    User log in successfully
                  </Alert>
                )}
                {authError && (
                  <Alert sx={{ mt: 3 }} severity="error">
                    {authError}
                  </Alert>
                )}
              </form>
              <p>------------------------------------------</p>
              <Button
                sx={{
                  background: "info.main",
                  mt: 3,
                  width: "75%",
                }}
                onClick={() => loginWithGoogle(location, navigate)}
                variant="contained"
              >
                Sign In With Google
              </Button>
            </>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <img style={{ width: "100%" }} src={loginImage} alt="login" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
