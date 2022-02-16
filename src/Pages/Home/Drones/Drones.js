import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Drone from "../Drone/Drone";

const Drones = ({ url }) => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => setDrones(data));
  }, []);
  return (
    <Container sx={{ my: 5 }}>
      <Typography sx={{ mb: 4, mx: "auto" }} variant="h1">
        Available Drones
      </Typography>
      <Grid container spacing={{ xs: 2, lg: 3 }}>
        {drones.map((drone) => (
          <Drone key={drone.name} drone={drone} />
        ))}
      </Grid>
    </Container>
  );
};

export default Drones;
