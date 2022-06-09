import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PaymentOptions from "./PaymentOptions";

const PaymentMethods = () => {
  const [openOptions, setOpenOptions] = useState(false);
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
        Payment Methods
      </Typography>
      <Button onClick={() => setOpenOptions(true)} variant="text">
        Add new card
      </Button>
      <FormControlLabel control={<Checkbox />} label="COD" />
      <PaymentOptions open={openOptions} setOpen={setOpenOptions} />
    </Paper>
  );
};

export default PaymentMethods;
