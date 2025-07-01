import { selectToken, selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Alert, Button, IconButton, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const MakeAdmin = () => {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState(false);
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .put("/users/admin", {
        headers: {
          "content-type": "application/json",
          authorization: token,
        },
        data: { email },
      })
      .then(({ data }) => {
        if (data.modifiedCount) {
          setSuccess(true);
        }
      })
      .finally(() => setEmail(""));
  };
  return (
    <>
      {success && (
        <Box sx={{ position: "fixed", top: "30%", left: "20%" }}>
          <Alert
            action={
              <IconButton onClick={() => setSuccess(false)}>
                <CloseIcon />{" "}
              </IconButton>
            }
            severity="success"
          >
            Successfully maked admin
          </Alert>
        </Box>
      )}

      <h2>Make a new admin</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          sx={{ width: "50%" }}
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
