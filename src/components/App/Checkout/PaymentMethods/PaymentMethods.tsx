import { Checkbox, FormControlLabel, Paper, Typography } from "@mui/material";
import CardForm from "./CardForm";

const PaymentMethods = ({ totalPrice }: { totalPrice: number }) => {
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        Payment Methods
      </Typography>

      <FormControlLabel sx={{ ml: 5 }} control={<Checkbox />} label="COD" />
      <CardForm totalPrice={totalPrice} />
    </Paper>
  );
};

export default PaymentMethods;
