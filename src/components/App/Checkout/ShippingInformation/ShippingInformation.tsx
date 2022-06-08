import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "./ShippingInformation.css";
const ShippingInformation = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Shipping Information
      </Typography>
      <form>
        <Typography sx={{ mb: 1 }} variant="h6">
          Contact
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            sx={{ width: "50%" }}
            variant="outlined"
            label="Name"
            size="small"
            required
          />
          <PhoneInput
            required
            className="phone-input"
            placeholder="Phone"
            value={phoneNumber}
            onChange={(e: any) => setPhoneNumber(e?.target.value)}
          />
        </Box>

        <Typography sx={{ mb: 1, mt: 3 }} variant="h6">
          Address
        </Typography>
        <Box>
          <Box sx={{ display: "flex" }}>
            <TextField
              required
              type="text"
              label="Street, house/apartment/unit"
              size="small"
              sx={{ width: "100%" }}
            />
            <TextField
              size="small"
              type="text"
              label="Apt, Suite, Unit, etc. (Optional)"
              sx={{ width: "100%", ml: 3 }}
            />
          </Box>
          <Box sx={{ display: "flex", mt: 1 }}>
            <TextField
              required
              type="text"
              label="Country"
              size="small"
              sx={{ width: "100%" }}
            />
            <TextField
              required
              type="text"
              label="State/Province/Region"
              size="small"
              sx={{ width: "100%", ml: 3 }}
            />
            <TextField
              required
              type="text"
              label="City"
              size="small"
              sx={{ width: "100%", ml: 3 }}
            />
            <TextField
              required
              type="text"
              label="Zip Code"
              size="small"
              sx={{ width: "100%", ml: 3 }}
            />
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default ShippingInformation;
