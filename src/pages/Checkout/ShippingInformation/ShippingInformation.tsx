import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import PhoneInput from "react-phone-number-input";
import { useSelector } from "react-redux";
import { AppState } from "redux/store";
import IShippingInfo from "types/ShippingInfoType";
import "./ShippingInformation.css";
const ShippingInformation = ({
  hasShippingInfo,
  shippingInformations,
  setShippingInformations,
}: {
  hasShippingInfo: boolean;
  shippingInformations: IShippingInfo;
  setShippingInformations: React.Dispatch<React.SetStateAction<IShippingInfo>>;
}) => {
  const { data: user } = useSelector((state: AppState) => state.auth);

  const { customerName, phone, street, country, state, city, zipCode, apt } =
    shippingInformations;

  const handleInputData = (e: React.FocusEvent<HTMLInputElement> | any) => {
    const newInformations: any = { ...shippingInformations };
    newInformations[e.target.name] = e.target.value;
    console.log(shippingInformations);
    setShippingInformations(newInformations);
  };

  const handlePhoneNumber = (e: any) => {
    const newInformations: any = { ...shippingInformations };
    newInformations["phone"] = e;

    setShippingInformations(newInformations);
  };

  const handleSaveShippingInformation = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const shippingInfo = {
      ...shippingInformations,
      customerEmail: user?.email,
    };

    axios({
      url: "http://localhost:8000/shippingInformation",
      method: "POST",
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
      data: shippingInfo,
    }).then((res) => {
      if (res.data.insertedId) {
        alert("successfully saved");
      }
    });
  };
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Shipping Information
      </Typography>
      <form onSubmit={handleSaveShippingInformation}>
        <Typography sx={{ mb: 1 }} variant="h6">
          Contact
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            sx={{ width: "50%" }}
            variant="outlined"
            label="Name"
            name="customerName"
            size="small"
            required
            onBlur={handleInputData}
            onChange={handleInputData}
            value={customerName}
          />
          <PhoneInput
            required
            className="phone-input"
            name="phone"
            placeholder="Phone"
            onChange={handlePhoneNumber}
            value={phone}
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
              onChange={handleInputData}
              value={street}
            />
            <TextField
              size="small"
              type="text"
              label="Apt, Suite, Unit, etc. (Optional)"
              name="apt"
              onBlur={handleInputData}
              sx={{ width: "100%", ml: 3 }}
              onChange={handleInputData}
              value={apt}
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
              onChange={handleInputData}
              value={country}
            />
            <TextField
              required
              type="text"
              label="State/Province/Region"
              name="state"
              size="small"
              sx={{ width: "100%", ml: 3 }}
              onBlur={handleInputData}
              onChange={handleInputData}
              value={state}
            />
            <TextField
              required
              type="text"
              label="City"
              name="city"
              size="small"
              sx={{ width: "100%", ml: 3 }}
              onBlur={handleInputData}
              onChange={handleInputData}
              value={city}
            />
            <TextField
              required
              type="number"
              label="Zip Code"
              name="zipCode"
              size="small"
              sx={{ width: "100%", ml: 3 }}
              onBlur={handleInputData}
              onChange={handleInputData}
              value={zipCode}
            />
          </Box>
        </Box>

        {/* submit btb */}
        <Button
          disabled={hasShippingInfo}
          type="submit"
          variant="outlined"
          sx={{ mt: 1.5 }}
        >
          Save Information
        </Button>
      </form>
    </Paper>
  );
};

export default ShippingInformation;
