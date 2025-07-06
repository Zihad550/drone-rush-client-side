import Spinner from '@/components/Shared/Spinner';
import { useMakeAdminMutation } from '@/redux/features/user/userApi';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Box, Button, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'sonner';

const MakeAdmin = () => {
  const [email, setEmail] = useState<string>('');
  const [success, setSuccess] = useState(false);
  const [makeAdmin, { isLoading }] = useMakeAdminMutation();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const toastId = toast.loading('Updating user role...');
    try {
      const res = await makeAdmin({ email }).unwrap();
      console.log(res);

      if (res.error) {
        console.log('error', res.error);
        toast.error(res.error?.data?.message);
      }
      if (res.success) {
        toast.success(res.message, { id: toastId });
      }
    } catch (err: any) {
      if (err?.data?.message) toast.error(err.data.message, { id: toastId });
      else toast.error('something went wrong', { id: toastId });
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      {success && (
        <Box sx={{ position: 'fixed', top: '30%', left: '20%' }}>
          <Alert
            action={
              <IconButton onClick={() => setSuccess(false)}>
                <CloseIcon />{' '}
              </IconButton>
            }
            severity="success"
          >
            Successfully maked admin
          </Alert>
        </Box>
      )}

      <h2>Request to make a new admin</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ width: '50%' }}
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
          placeholder="email"
          type="email"
          label="email"
          value={email}
        />
        <br />
        <Button sx={{ my: 3 }} variant="contained" type="submit">
          Make Admin
        </Button>
      </form>
    </>
  );
};

export default MakeAdmin;
