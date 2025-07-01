import { Email, VpnKey } from "@mui/icons-material";
import {
  Alert,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
// import Spinner from "@/components/Shared/Spinner";
import React, { useState } from "react";
import type { ChangeEvent } from "react";
import { NavLink, useLocation, useNavigate } from "react-router";
import loginImage from "@/assets/login.jpg";
import type { ILoginData } from "@/types/LoginType";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/auth/authSlice";

const Login = () => {
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
  });

  const user = useAppSelector(selectUser);

  const { state }: any = useLocation();
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field: string = e.target.name;
    const value: string = e.target.value;
    const newLoginData: any = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  if (user?.id) navigate(state?.from || "/");
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // !! change to proper type
    // dispatch<any>(login(loginData));
  };

  // if (loadingState === "pending") return <Spinner />;
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
          size={{ xs: 12, md: 6 }}
        >
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
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  },
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
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKey />
                      </InputAdornment>
                    ),
                  },
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
                sx={{
                  background: "info.main",
                  mt: 3,
                  width: "75%",
                  color: "white",
                }}
              >
                Login
              </Button>
              {user?.id && (
                <Alert sx={{ mt: 3 }} severity="success">
                  User log in successfully
                </Alert>
              )}
              {/* {error && (
                <Alert sx={{ mt: 3 }} severity="error">
                  {"authentication failed"}
                </Alert>
              )} */}
            </form>
            {/* <p>------------------------------------------</p> */}
            {/* <Button
                sx={{
                  background: "info.main",
                  mt: 3,
                  width: "75%",
                }}
                onClick={() => loginWithGoogle(location, navigate)}
                variant="contained"
              >
                Sign In With Google
              </Button> */}
          </>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <img style={{ width: "100%" }} src={loginImage} alt="login" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
