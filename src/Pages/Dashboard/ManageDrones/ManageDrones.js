import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ManageDrone from "../ManageDrone/ManageDrone";

const ManageDrones = () => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    fetch("https://still-castle-43681.herokuapp.com/drones")
      .then((res) => res.json())
      .then((data) => setDrones(data));
  }, []);
  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Manage Drones
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {drones.map((drone) => (
          <ManageDrone key={drone._id} drone={drone} />
        ))}
      </Grid>
    </Container>
  );
};

export default ManageDrones;
