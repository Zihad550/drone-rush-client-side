import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Button,
  Box,
  Checkbox,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useState } from "react";
import type IShippingInfo from "@/types/shippingInfo.type";
import { useAppSelector } from "@/redux/hooks";
import { selectToken, selectUser } from "@/redux/features/auth/authSlice";

const OrderSummary = ({
  totalPrice,
  paymentMethod,
  shippingInformations,
}: {
  totalPrice: number;
  paymentMethod: string;
  shippingInformations: Partial<IShippingInfo>;
}) => {
  const [showCoupons, setShowCoupons] = useState(false);
  // const cartProducts = useSelector((state: AppState) => state.cart);
  const cartProducts = [];
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  // const dispatch = useDispatch();
  const handlePlaceOrder = () => {
    // if the payment method is not selected then don't place order
    if (!paymentMethod) return alert("Please! select a payment method");

    // validate shipping information is complete
    if (
      !shippingInformations.street ||
      !shippingInformations.city ||
      !shippingInformations.state ||
      !shippingInformations.country ||
      !shippingInformations.zipCode
    ) {
      return alert("Please complete shipping information before placing order");
    }

    // collect details
    const orderDetails = {
      ...shippingInformations,
      paymentMethod,
      products: cartProducts,
    };

    // place order
    axios({
      method: "POST",
      url: `${import.meta.env.VITE_APP_API_URL}/orders`,
      headers: {
        Authorization: token,
      },
      data: orderDetails,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          // dispatch(clearCart());
          alert("Order placed successfully!");
          // Redirect to order success page or order history
          window.location.href = "/orders";
        }
      })
      .catch((error) => {
        console.error("Error placing order:", error);
        alert("Failed to place order. Please try again.");
      });
  };

  return (
    <Paper sx={{ p: 3, ml: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
        Order Summary
      </Typography>

      {/* coupon */}
      <Box sx={{ mb: 2 }}>
        <Button
          variant="text"
          sx={{ color: "black", position: "relative" }}
          onClick={() => setShowCoupons((state) => !state)}
          endIcon={showCoupons ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        >
          Select Coupon
        </Button>
        {showCoupons && (
          <Paper sx={{ position: "absolute", zIndex: 4 }} elevation={5}>
            <MenuItem sx={{ border: 0 }} value={10}>
              <Checkbox disabled />
              No coupons available
            </MenuItem>
          </Paper>
        )}
      </Box>

      {/* promo code */}
      <Box>
        <Typography variant="caption">Promo Code</Typography>
        <Box sx={{ display: "flex" }}>
          <TextField type="text" size="small" />
          <Button variant="outlined" color="info">
            Apply
          </Button>
        </Box>
      </Box>

      {/* total */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 2,
        }}
      >
        <Typography variant="body1">Total</Typography>
        <Typography variant="body1" sx={{ fontSize: 40 }}>
          $ {totalPrice}
        </Typography>
      </Box>

      {/* place order */}
      <Button
        onClick={handlePlaceOrder}
        variant="contained"
        sx={{ color: "white", width: "100%" }}
        disabled={
          !shippingInformations.street ||
          !shippingInformations.city ||
          !shippingInformations.state ||
          !shippingInformations.country ||
          !shippingInformations.zipCode
        }
      >
        Place Order
      </Button>
    </Paper>
  );
};

export default OrderSummary;
