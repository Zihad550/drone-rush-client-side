import { Add } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const AddDrone = () => {
  const [droneInfo, setDroneInfo] = useState({});

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...droneInfo };
    newInfo[field] = value;
    setDroneInfo(newInfo);
  };
  const handleBooking = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/drones", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(droneInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Drone Successfully added");
        }
      });
  };
  return (
    <div>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Add New Drone
      </Typography>
      <form onSubmit={handleBooking}>
        <TextField
          size="small"
          name="name"
          onBlur={handleOnBlur}
          placeholder="Drone Name"
          fullWidth
        />
        <TextField
          name="price"
          onBlur={handleOnBlur}
          size="small"
          fullWidth
          type="number"
          placeholder="Drone Price"
        />

        <TextField
          placeholder="Drone Image src"
          type="text"
          onBlur={handleOnBlur}
          size="small"
          name="img"
          fullWidth
        />
        <TextField
          type="text"
          size="small"
          multiline
          rows={3}
          onBlur={handleOnBlur}
          name="disc"
          fullWidth
          placeholder="Description"
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
    </div>
  );
};

export default AddDrone;
