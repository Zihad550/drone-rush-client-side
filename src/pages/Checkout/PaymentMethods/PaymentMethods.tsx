import type { TPaymentMethod } from '@/types/shippingInfo.type';
import { Checkbox, FormControlLabel, Paper, Typography } from '@mui/material';
import React, { useState } from 'react';

const PaymentMethods = ({
  totalPrice,
  setPaymentMethod,
}: {
  totalPrice: number;
  setPaymentMethod: React.Dispatch<React.SetStateAction<TPaymentMethod>>;
}) => {
  const [isCOD, setIsCOD] = useState(false);

  const onChange = (check: boolean) => {
    setIsCOD(check);
    setPaymentMethod(check ? 'COD' : 'CARD');
  };

  // if (isCOD) setPaymentMethod('COD');
  // else setPaymentMethod('CARD');
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
        Payment Methods
      </Typography>

      <FormControlLabel
        onChange={(e, checked) => onChange(checked)}
        control={<Checkbox />}
        checked={isCOD}
        label="COD (Cash On Delivery)"
      />
      <Typography sx={{ display: 'block' }} variant="caption">
        or, Pay with card
      </Typography>
      {/* <CardForm totalPrice={totalPrice} /> */}
    </Paper>
  );
};

export default PaymentMethods;
