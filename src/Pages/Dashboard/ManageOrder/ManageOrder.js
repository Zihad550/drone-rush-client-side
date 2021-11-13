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

const ManageOrder = ({ order }) => {
  const { productName, disc, price, img, userName, orderStatus, _id } = order;
  const history = useHistory();
  const newOrder = {
    ...order,
    orderStatus: "Shipped",
  };

  const handleStatus = () => {
    fetch(`http://localhost:5000/orders`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newOrder),
    });
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
            {productName}
          </Typography>
          <Typography gutterBottom variant="body2">
            Order placed by: {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {disc}
          </Typography>
          <Typography variant="h5" color="success.main" sx={{ mb: 0, mt: 3 }}>
            Price: ${price}
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            {orderStatus}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={handleStatus}
            endIcon={<ShoppingCart />}
            sx={{ width: "100%" }}
            variant="contained"
            size="small"
          >
            Update Status
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ManageOrder;
