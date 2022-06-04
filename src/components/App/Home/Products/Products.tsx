import { Container, Grid, Typography } from "@mui/material";
import Spinner from "components/Shared/Spinner";
import React from "react";
import IProduct from "types/ProductType";
import Product from "./Product";

const Products = ({ products }: { products: IProduct[] }) => {
  return (
    <Container sx={{ my: 5 }}>
      <Typography sx={{ mb: 4, mx: "auto" }} variant="h1">
        Available Drones
      </Typography>
      <Grid container spacing={{ xs: 2, lg: 3 }}>
        {products ? (
          products.map((product) => (
            <Product key={product.name} drone={product} />
          ))
        ) : (
          <Spinner />
        )}
      </Grid>
    </Container>
  );
};

export default Products;
