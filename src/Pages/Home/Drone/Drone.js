import { ShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

const Drone = ({ drone }) => {
  const { name, disc, price, img } = drone;
  const history = useHistory();

  const handlePurchase = () => {
    history.push(`/purchase/${name}`);
  };
  return (
    <Grid item xs={12} md={4} lg={6}>
      <Card sx={{ boxShadow: 3, display: "flex" }}>
        <CardMedia
          component="img"
          width="100%"
          height="100%"
          image={img}
          alt="green iguana"
        />

        <CardContent sx={{ py: "auto" }}>
          <Typography gutterBottom variant="h6" component="h4">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {disc}
          </Typography>
          <Typography variant="h5" color="success.main" sx={{ mb: 0, mt: 1 }}>
            Price: ${price}
          </Typography>
          <Button
            onClick={handlePurchase}
            endIcon={<ShoppingCart />}
            sx={{ width: "100%" }}
            variant="contained"
            size="small"
          >
            Purchase now
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Drone;
