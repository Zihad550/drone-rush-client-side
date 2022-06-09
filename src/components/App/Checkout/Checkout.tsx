import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import Spinner from "components/Shared/Spinner";
import { useParams } from "react-router";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";
import ShippingInformation from "./ShippingInformation";

const Checkout = () => {
  const { totalPrice } = useParams();
  console.log(totalPrice);
  if (!totalPrice) return <Spinner />;
  return (
    <Box sx={{ background: "#F2EEF5" }}>
      <Container>
        <Grid container sx={{ pt: 3 }}>
          <Grid item lg={8}>
            <ShippingInformation />
            <PaymentMethods totalPrice={Number(totalPrice)} />
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
