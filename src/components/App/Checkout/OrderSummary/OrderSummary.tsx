import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Button, Checkbox, Paper, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { SelectChangeEvent } from "@mui/material/Select";
import { Box } from "@mui/system";
import { useState } from "react";

const OrderSummary = () => {
  const [age, setAge] = useState("");
  const [showCoupons, setShowCoupons] = useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
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
          $ 11.42
        </Typography>
      </Box>

      {/* place order */}
      <Button variant="contained" sx={{ color: "white", width: "100%" }}>
        Place Order
      </Button>
    </Paper>
  );
};

export default OrderSummary;
