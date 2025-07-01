import { Email, Person, VpnKey } from "@mui/icons-material";
import {
  Alert,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { NavLink, useNavigate } from "react-router";
import loginImage from "../../../../images/login.jpg";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/auth/authSlice";

type LoginData = {
  password: string;
  retype_password: string;
  name: string;
  email: string;
};
const Register = () => {
  const [registerData, setRegisterData] = useState<LoginData>({
    password: "",
    retype_password: "",
    name: "",
    email: "",
  });

  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  if (user) navigate(state?.from || "/");

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...registerData };
    newLoginData[field] = value;
    setRegisterData(newLoginData);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerData.password !== registerData.retype_password) {
      alert("password did not match");
    } else {
      dispatch(
        register({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        }),
      );
    }
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
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Typography variant="h6">Register</Typography>
          <>
            <form onSubmit={handleRegister}>
              <TextField
                required
                sx={{ width: "75%" }}
                label="Your Name"
                onChange={handleOnChange}
                variant="standard"
                name="name"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                sx={{ width: "75%" }}
                label="Your Email"
                onChange={handleOnChange}
                variant="standard"
                name="email"
                margin="dense"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <TextField
                required
                sx={{ width: "75%" }}
                onChange={handleOnChange}
                label="Your Password"
                variant="standard"
                type="password"
                margin="dense"
                name="password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                sx={{ width: "75%" }}
                onChange={handleOnChange}
                label="Retype Your Password"
                variant="standard"
                type="password"
                margin="dense"
                name="retype_password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  ),
                }}
              />
              <br />
              <NavLink style={{ textDecoration: "none" }} to="/login">
                <Button variant="text">Already Registered? Please Login</Button>
              </NavLink>
              <br />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: "info.main",
                  mt: 3,
                  width: "75%",
                  color: "white",
                }}
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
            {error && <Alert severity="error">{"authentication failed"}</Alert>}
          </>
        </Grid>
        <Grid item xs={12} md={6}>
          <img style={{ width: "100%" }} src={loginImage} alt="login" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
