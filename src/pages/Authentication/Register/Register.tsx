import loginImage from '@/assets/login.jpg';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import { selectUser, setUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { verifyToken } from '@/utils/verifyToken';
import { Email, Person, VpnKey } from '@mui/icons-material';
import {
  Alert,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';

type LoginData = {
  password: string;
  retype_password: string;
  name: string;
  email: string;
};
const Register = () => {
  const [registerData, setRegisterData] = useState<LoginData>({
    password: '',
    retype_password: '',
    name: '',
    email: '',
  });

  const [register, { error }] = useRegisterMutation();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  if (user) navigate(state?.from || '/');

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...registerData };
    newLoginData[field] = value;
    setRegisterData(newLoginData);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading('Registering user...');
    try {
      if (registerData.password !== registerData.retype_password) {
        toast.error('Password did not match', {
          id: toastId,
        });
      } else {
        const res = await register({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        }).unwrap();
        const user = verifyToken(res.data.accessToken);
        dispatch(setUser({ user, token: res.data.accessToken }));
        toast.success('Registered successfully', { id: toastId });
        navigate('/');
      }
    } catch (err) {
      if (err?.data?.message) toast.error(err.data.message, { id: toastId });
      else toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <Container sx={{ my: 5 }}>
      <Grid
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        container
        spacing={{ xs: 2, md: 3 }}
      >
        <Grid
          sx={{ display: 'flex', flexDirection: 'column' }}
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
                sx={{ width: '75%' }}
                label="Your Name"
                onChange={handleOnChange}
                variant="standard"
                name="name"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                required
                sx={{ width: '75%' }}
                label="Your Email"
                onChange={handleOnChange}
                variant="standard"
                name="email"
                margin="dense"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <br />
              <TextField
                required
                sx={{ width: '75%' }}
                onChange={handleOnChange}
                label="Your Password"
                variant="standard"
                type="password"
                margin="dense"
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
              <TextField
                required
                sx={{ width: '75%' }}
                onChange={handleOnChange}
                label="Retype Your Password"
                variant="standard"
                type="password"
                margin="dense"
                name="retype_password"
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
              <NavLink style={{ textDecoration: 'none' }} to="/login">
                <Button variant="text">Already Registered? Please Login</Button>
              </NavLink>
              <br />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: 'info.main',
                  mt: 3,
                  width: '75%',
                  color: 'white',
                }}
              >
                Register
              </Button>
            </form>
            {user?.id && (
              <Alert sx={{ mt: 3 }} severity="success">
                {' '}
                User created successfully
              </Alert>
            )}
            {error && <Alert severity="error">{'authentication failed'}</Alert>}
          </>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <img style={{ width: '100%' }} src={loginImage} alt="login" />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
