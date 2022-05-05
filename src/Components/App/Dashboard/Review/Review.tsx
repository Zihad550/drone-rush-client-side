import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import IOrder from "../../../../types/OrderType";
import MyOrder from "../MyOrder/MyOrder";

const Review = ({ myOrders }: {myOrders: IOrder[]}) => {
  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Give Review
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {myOrders.map((myOrder) => (
          <MyOrder myOrder={myOrder} key={myOrder._id} />
        ))}{" "}
      </Grid>
    </Container>
  );
};

export default Review;
