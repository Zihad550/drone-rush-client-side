import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import Spinner from "components/Shared/Spinner";
import { useState } from "react";
import { useParams } from "react-router";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";
import ShippingInformation from "./ShippingInformation";

const Checkout = () => {
  const { totalPrice } = useParams();
  const [shippingInformations, setShippingInformations] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("COD");
  if (!totalPrice) return <Spinner />;
  return (
    <Box sx={{ background: "#F2EEF5" }}>
      <Container>
        <Grid container sx={{ pt: 3 }}>
          <Grid item lg={8}>
            <ShippingInformation
              shippingInformations={shippingInformations}
              setShippingInformations={setShippingInformations}
            />
            <PaymentMethods
              totalPrice={Number(totalPrice)}
              setPaymentMethod={setPaymentMethod}
            />
          </Grid>
          <Grid item lg={4}>
            <OrderSummary
              totalPrice={Number(totalPrice)}
              shippingInformations={shippingInformations}
              paymentMethod={paymentMethod}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
