import { Box, Grid, Container } from "@mui/material";
import Spinner from "@/components/Shared/Spinner";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type IShippingInfo from "@/types/ShippingInfoType";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";
import ShippingInformation from "./ShippingInformation";
import { useAppSelector } from "@/redux/hooks";
import { selectToken, selectUser } from "@/redux/features/auth/authSlice";

const Checkout = () => {
  const { totalPrice } = useParams();
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const [hasShippingInfo, setHasShippingInfo] = useState(false);
  const navigate = useNavigate();
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
    fetch(`http://localhost:8000/shippingInformation/${user?.id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setShippingInformations(data);
          setHasShippingInfo(true);
          navigate("/orderPlaced");
        }
      });
  }, []);
  if (!totalPrice) return <Spinner />;
  return (
    <Box sx={{ background: "#F2EEF5" }}>
      <Container>
        <Grid container sx={{ pt: 3 }}>
          <Grid size={{ lg: 8 }}>
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
          <Grid size={{ lg: 4 }}>
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
