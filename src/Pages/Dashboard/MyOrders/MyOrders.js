import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import MyOrder from "../MyOrder/MyOrder";

const MyOrders = ({ myOrders, handleOpenReview }) => {
  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        My Orders
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {myOrders.map((myOrder) => (
          <MyOrder
            handleOpenReview={handleOpenReview}
            key={myOrder._id}
            myOrder={myOrder}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default MyOrders;
