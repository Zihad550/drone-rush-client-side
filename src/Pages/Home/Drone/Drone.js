import { ShoppingCart } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { useHistory } from "react-router";

const Drone = ({ drone }) => {
  const { name, disc, price, img } = drone;
  const history = useHistory();

  const theme = useTheme();
  const useStyle = makeStyles({
    directionRow: {
      [theme.breakpoints.up("sm")]: {
        display: "flex !important",
      },
    },
  });
  const { directionRow } = useStyle();

  const handlePurchase = () => {
    history.push(`/purchase/${name}`);
  };
  return (
    <Grid item xs={12} md={12} lg={6}>
      <Card
        className={directionRow}
        sx={{
          boxShadow: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
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
