import { ShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
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
    <Grid item xs={12} md={4} lg={3}>
      <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
        <CardMedia
          component="img"
          width="100%"
          image={img}
          alt="green iguana"
        />
        <CardContent sx={{ pb: 0 }}>
          <Typography gutterBottom variant="h5" component="h4">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {disc}
          </Typography>
          <Typography variant="h5" color="success.main" sx={{ mb: 0, mt: 3 }}>
            Price: ${price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={handlePurchase}
            endIcon={<ShoppingCart />}
            sx={{ width: "100%" }}
            variant="contained"
            size="small"
          >
            Purchase now
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Drone;
