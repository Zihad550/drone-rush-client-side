import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import IDrone from "../../../../types/DroneType";
import Spinner from "../../../Shared/Spinner";
import Drone from "./Drone";

const Drones = ({ products }: { products: IDrone[] }) => {
  return (
    <Container sx={{ my: 5 }}>
      <Typography sx={{ mb: 4, mx: "auto" }} variant="h1">
        Available Drones
      </Typography>
      <Grid container spacing={{ xs: 2, lg: 3 }}>
        {products ? (
          products.map((product) => (
            <Drone key={product.name} drone={product} />
          ))
        ) : (
          <Spinner />
        )}
      </Grid>
    </Container>
  );
};

export default Drones;
