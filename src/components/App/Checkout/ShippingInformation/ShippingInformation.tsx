import { Box, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "./ShippingInformation.css";
const ShippingInformation = ({
  shippingInformations,
  setShippingInformations,
}: {
  shippingInformations: {};
  setShippingInformations: React.Dispatch<React.SetStateAction<{}>>;
}) => {
  const [phoneNumber, setPhoneNumber] = useState();
  console.log(shippingInformations);

  const handleInputData = (e: React.FocusEvent<HTMLInputElement>) => {
    const newInformations: any = { ...shippingInformations };
    newInformations[e.target.name] = e.target.value;
    setShippingInformations(newInformations);
  };
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
            name="name"
            size="small"
            required
            onBlur={handleInputData}
          />
          <PhoneInput
            required
            className="phone-input"
            name="phone"
            placeholder="Phone"
            value={phoneNumber}
            onChange={(e: any) => setPhoneNumber(e)}
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
              name="street"
              size="small"
              sx={{ width: "100%" }}
              onBlur={handleInputData}
            />
            <TextField
              size="small"
              type="text"
              label="Apt, Suite, Unit, etc. (Optional)"
              name="apt"
              onBlur={handleInputData}
              sx={{ width: "100%", ml: 3 }}
            />
          </Box>
          <Box sx={{ display: "flex", mt: 1 }}>
            <TextField
              required
              type="text"
              label="Country"
              name="country"
              size="small"
              sx={{ width: "100%" }}
              onBlur={handleInputData}
            />
            <TextField
              required
              type="text"
              label="State/Province/Region"
              name="state"
              size="small"
              sx={{ width: "100%", ml: 3 }}
              onBlur={handleInputData}
            />
            <TextField
              required
              type="text"
              label="City"
              name="city"
              size="small"
              sx={{ width: "100%", ml: 3 }}
              onBlur={handleInputData}
            />
            <TextField
              required
              type="number"
              label="Zip Code"
              name="zipCode"
              size="small"
              sx={{ width: "100%", ml: 3 }}
              onBlur={handleInputData}
            />
          </Box>
        </Box>
      </form>
    </Paper>
  );
};

export default ShippingInformation;
