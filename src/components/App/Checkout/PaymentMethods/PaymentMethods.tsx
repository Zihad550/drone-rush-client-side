import { Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

const PaymentMethods = ({
  totalPrice,
  setPaymentMethod,
}: {
  totalPrice: number;
  setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isCOD, setIsCOD] = useState(false);
  const [isCard, setIsCard] = useState(false);
  console.log(isCOD);

  if (isCard) setPaymentMethod("Card");
  if (isCOD) setPaymentMethod("COD");
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        Payment Methods
      </Typography>

      <FormControlLabel
        onChange={() => setIsCOD(!isCOD)}
        control={<Checkbox />}
        checked={isCOD}
        label="COD (Cash On Delivery)"
      />
      {/* <Typography sx={{ display: "block" }} variant="caption">
        or, Pay with card
      </Typography>
      <CardForm totalPrice={totalPrice} /> */}
    </Paper>
  );
};

export default PaymentMethods;
