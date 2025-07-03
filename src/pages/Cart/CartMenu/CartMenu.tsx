import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const CartMenu = ({
  subTotal,
  shippingCost,
  totalPrice,
}: {
  subTotal: number;
  shippingCost: number;
  totalPrice: number;
}) => {
  const navigate = useNavigate();
  return (
    <Grid size={{ md: 4, xs: 12 }}>
      <Card>
        <CardContent>
          <Typography
            sx={{ textAlign: "center" }}
            variant="h4"
            color="text.secondary"
            gutterBottom
          >
            Cart
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              component="span"
              sx={{ textAlign: "center" }}
              variant="h6"
              gutterBottom
            >
              Subtotal
            </Typography>
            <Typography
              component="span"
              sx={{ textAlign: "center" }}
              variant="h6"
              gutterBottom
            >
              $ {subTotal}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              component="span"
              sx={{ textAlign: "center" }}
              variant="h6"
              gutterBottom
            >
              Shipping
            </Typography>
            <Typography
              component="span"
              sx={{ textAlign: "center" }}
              variant="h6"
              gutterBottom
            >
              $ {shippingCost}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              component="span"
              sx={{ textAlign: "center" }}
              variant="h6"
              gutterBottom
            >
              Total
            </Typography>
            <Typography
              component="span"
              sx={{ textAlign: "center" }}
              variant="h6"
              gutterBottom
            >
              $ {totalPrice}
            </Typography>
          </Box>
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={() => navigate(`/user/checkout/${totalPrice}`)}>
            Proceed to Checkout
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default React.memo(CartMenu);
