import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";


const MakeAdmin = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const { token } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email };
    fetch("https://still-castle-43681.herokuapp.com/users/admin", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setSuccess(true);
        }
      }).finally(() => e.target.reset());
  };
  return (
    <>
      {success && <Box sx={{position: 'fixed', top: '30%', left: '20%'}}>
        <Alert action={<IconButton onClick={() => setSuccess(false)}><CloseIcon/> </IconButton>} severity="success">Successfully maked admin</Alert>
      </Box>}

      <h2>Make a new admin</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ width: "50%" }}
          onBlur={(e) => setEmail(e.target.value)}
          variant="standard"
          placeholder="email"
          type="email"
          label="email"
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
