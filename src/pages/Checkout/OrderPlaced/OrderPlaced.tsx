import { Box, Button, Typography } from "@mui/material";

const OrderPlaced = () => {
  return (
    <Box sx={{ height: "50vh", background: "#fbdd74" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Typography variant="h3">Order Placed Successfully</Typography>
        <Typography variant="body1">
          Your order will arrive between 2/3 business days.
        </Typography>
        <Button sx={{ color: "white", mt: 1 }} variant="contained">
          Manage Orders
        </Button>
      </Box>
    </Box>
  );
};

export default OrderPlaced;
