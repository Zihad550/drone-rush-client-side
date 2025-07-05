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
import { useState } from "react";
import { toast } from "sonner";
import type IShippingInfo from "@/types/shippingInfo.type";
import { useAppDispatch } from "@/redux/hooks";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { clearCart } from "@/redux/features/cart/cartSlice";

const OrderSummary = ({
  totalPrice,
  paymentMethod,
  shippingInformations,
  formattedProducts,
}: {
  totalPrice: number;
  paymentMethod: string;
  shippingInformations: Partial<IShippingInfo>;
  formattedProducts: { _id: string; quantity: number }[];
}) => {
  const [showCoupons, setShowCoupons] = useState(false);
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const handlePlaceOrder = async () => {
    // if the payment method is not selected then don't place order
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    // validate shipping information is complete
    if (
      !shippingInformations.street ||
      !shippingInformations.city ||
      !shippingInformations.state ||
      !shippingInformations.country ||
      !shippingInformations.zipCode
    ) {
      toast.error("Please complete shipping information before placing order");
      return;
    }

    // collect details
    const orderDetails = {
      shippingInformation: shippingInformations._id,
      paymentMethod,
      products: formattedProducts,
    };

    try {
      const response = await createOrder(orderDetails).unwrap();

      if (response.success) {
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        // Redirect to order success page or order history
        window.location.href = "/user/orders";
      }
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    }
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
          isLoading ||
          !shippingInformations.street ||
          !shippingInformations.city ||
          !shippingInformations.state ||
          !shippingInformations.country ||
          !shippingInformations.zipCode
        }
      >
        {isLoading ? "Processing..." : "Place Order"}
      </Button>
    </Paper>
  );
};

export default OrderSummary;
