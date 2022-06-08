import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";
import ShippingInformation from "./ShippingInformation";

const Checkout = () => {
  return (
    <Box sx={{ background: "#F2EEF5" }}>
      <Container>
        <Grid container sx={{ pt: 3 }}>
          <Grid item lg={8}>
            <ShippingInformation />
            <PaymentMethods />
          </Grid>
          <Grid item lg={4}>
            <OrderSummary />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
