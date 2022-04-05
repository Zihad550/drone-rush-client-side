import { Add } from "@mui/icons-material";
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Button, IconButton, TextField, Typography } from "@mui/material";
import { Box } from '@mui/system';
import React, { useState } from "react";


const AddDrone = () => {
  const [droneInfo, setDroneInfo] = useState({});
  const [isAdded, setIsAdded] = useState(false);

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...droneInfo };
    newInfo[field] = value;
    setDroneInfo(newInfo);
  };
  const handleBooking = (e) => {
    e.preventDefault();
    fetch("https://still-castle-43681.herokuapp.com/drones", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({...droneInfo, deletable: true}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setIsAdded(true)
        }
      }).finally(() => e.target.reset())
  };
  return (
    <>
    {/* modal */}
    {
        isAdded && <Box sx={{position: 'fixed', top: '65%', left: '40%'}}>
        <Alert action={<IconButton onClick={() => setIsAdded(false)}><CloseIcon/> </IconButton>} severity="success">Drone Added Successfully</Alert>
      </Box>
      }
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Add New Drone
      </Typography>
      <form onSubmit={handleBooking}>
        <TextField
          required
          size="small"
          name="name"
          onBlur={handleOnBlur}
          label="Drone Name"
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <TextField
          required
          variant="outlined"
          name="price"
          margin="dense"
          onBlur={handleOnBlur}
          size="small"
          fullWidth
          type="number"
          label="Drone Price"
        />

        <TextField
          required
          variant="outlined"
          label="Drone Image src"
          type="text"
          onBlur={handleOnBlur}
          size="small"
          name="img"
          fullWidth
        />
        <TextField
          required
          variant="outlined"
          type="text"
          size="small"
          margin="dense"
          multiline
          rows={3}
          onBlur={handleOnBlur}
          name="disc"
          fullWidth
          label="Description"
        />

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
          endIcon={<Add />}
        >
          Add Drone
        </Button>
      </form>
    </>
  );
};

export default AddDrone;
