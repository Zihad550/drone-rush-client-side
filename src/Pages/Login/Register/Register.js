import { Email, Person, VpnKey } from "@mui/icons-material";
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
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import loginImage from "../../../images/login.jpg";

const Register = () => {
  const [loginData, setLoginData] = useState({});

  const { registerUser, isLoading, authError, user } = useAuth();

  const history = useHistory();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (loginData.password !== loginData.retype_password) {
      alert("password did not match");
    } else {
      registerUser(
        loginData.email,
        loginData.retype_password,
        loginData.name,
        history
      );
    }
  };
  return (
    <Container>
      <Grid
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        container
        spacing={{ xs: 2, md: 3 }}
      >
        <Grid
          sx={{ display: "flex", flexDirection: "column" }}
          item
          xs={12}
          md={6}
        >
          <Typography variant="h6">Register</Typography>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <form onSubmit={handleRegister}>
                <TextField
                  sx={{ width: "75%" }}
                  label="Your Name"
                  onBlur={handleOnBlur}
                  variant="standard"
                  name="name"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <Person />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  sx={{ width: "75%" }}
                  label="Your Email"
                  onBlur={handleOnBlur}
                  variant="standard"
                  name="email"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <Email />
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <TextField
                  sx={{ width: "75%" }}
                  onBlur={handleOnBlur}
                  label="Your Password"
                  variant="standard"
                  type="password"
                  margin="dense"
                  name="password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <VpnKey />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  sx={{ width: "75%" }}
                  onBlur={handleOnBlur}
                  label="Retype Your Password"
                  variant="standard"
                  type="password"
                  margin="dense"
                  name="retype_password"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <VpnKey />
                      </InputAdornment>
                    ),
                  }}
                />
                <br />
                <NavLink style={{ textDecoration: "none" }} to="/login">
                  <Button variant="text">
                    Already Registered? Please Login
                  </Button>
                </NavLink>
                <br />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ background: "info.main", mt: 3, width: "75%" }}
                >
                  Register
                </Button>
              </form>
              {user?.email && (
                <Alert sx={{ mt: 3 }} severity="success">
                  {" "}
                  User created successfully
                </Alert>
              )}
              {authError && <Alert severity="error">{authError}</Alert>}
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

export default Register;
