import loginImage from "@/assets/login.jpg";
import Spinner from "@/components/Shared/Spinner";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { selectUser, setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { ILoginData } from "@/types/LoginType";
import { verifyToken } from "@/utils/verifyToken";
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
import type { ChangeEvent } from "react";
import React, { useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const [loginData, setLoginData] = useState<ILoginData>({
    email: "",
    password: "",
  });

  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field: string = e.target.name;
    const value: string = e.target.value;
    const newLoginData: any = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };

  if (user?.id) {
    <Navigate to="/" />;
  }
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in");
    try {
      const res = await login(loginData).unwrap();
      toast.success("Logged in", { id: toastId, duration: 2000 });
      const user = verifyToken(res.data.accessToken);
      dispatch(setUser({ user, token: res.data.accessToken }));
      await navigate("/");
    } catch (err: any) {
      if (err?.data?.message) toast.error(err.data.message, { id: toastId });
      else toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  if (isLoading) return <Spinner />;

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
