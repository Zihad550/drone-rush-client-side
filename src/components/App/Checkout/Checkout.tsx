import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import Spinner from "components/Shared/Spinner";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppState } from "redux/store";
import IShippingInfo from "types/ShippingInfoType";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";
import ShippingInformation from "./ShippingInformation";

const Checkout = () => {
  const { totalPrice } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const { data: user } = useSelector((state: AppState) => state.auth);
  const [hasShippingInfo, setHasShippingInfo] = useState(false);
  const [shippingInformations, setShippingInformations] =
    useState<IShippingInfo>({
      customerName: "",
      phone: "",
      street: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      apt: "",
    });

  useEffect(() => {
    fetch(`http://localhost:8000/shippingInformation/${user?.email}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setShippingInformations(data);
          setHasShippingInfo(true);
        }
      });
  }, [user?.email]);
  if (!totalPrice) return <Spinner />;
  return (
    <Box sx={{ background: "#F2EEF5" }}>
      <Container>
        <Grid container sx={{ pt: 3 }}>
          <Grid item lg={8}>
            <ShippingInformation
              shippingInformations={shippingInformations}
              hasShippingInfo={hasShippingInfo}
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
              paymentMethod={paymentMethod}
              shippingInformations={shippingInformations}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
