import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Button, Checkbox, Paper, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "redux/actions/cartAction";
import { AppState } from "redux/store";
import IShippingInfo from "types/ShippingInfoType";

const OrderSummary = ({
  totalPrice,
  paymentMethod,
  shippingInformations,
}: {
  totalPrice: number;
  paymentMethod: string;
  shippingInformations: IShippingInfo;
}) => {
  const [showCoupons, setShowCoupons] = useState(false);
  const cartProducts = useSelector((state: AppState) => state.cart);
  const { data: user } = useSelector((state: AppState) => state.auth);
  const dispatch = useDispatch();
  const handlePlaceOrder = () => {
    // if the payment method is not selected then don't place order
    if (!paymentMethod) return alert("Please! select a payment method");

    // collect details
    const orderDetails = {
      ...shippingInformations,
      paymentMethod,
      products: cartProducts,
    };

    // place order
    axios({
      method: "POST",
      url: "http://localhost:8000/order",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      data: orderDetails,
    }).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        dispatch(clearCart());
        console.log(res.data);
      }
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
      >
        Place Order
      </Button>
    </Paper>
  );
};

export default OrderSummary;
