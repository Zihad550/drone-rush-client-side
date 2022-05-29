import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import IDrone from "../../../../types/DroneType";
import Spinner from "../../../Shared/Spinner";
import Drone from "./Drone";

const Drones = ({ url }: { url: string }) => {
  const [drones, setDrones] = useState<IDrone[] | null>(null);

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
        {drones ? (
          drones.map((drone) => <Drone key={drone.name} drone={drone} />)
        ) : (
          <Spinner />
        )}
      </Grid>
    </Container>
  );
};

export default Drones;
