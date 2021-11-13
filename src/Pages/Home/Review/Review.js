import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";

const Review = ({ review }) => {
  const { userName, message, rating, img } = review;

  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ boxShadow: 3 }}>
        <CardMedia
          component="img"
          width="100%"
          image={img}
          alt="green iguana"
        />
        <CardContent sx={{ pb: 0, my: "auto" }}>
          <Typography gutterBottom variant="h5" component="h4">
            Reviewed by {userName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            About the product: {message}
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 0, mt: 2, display: "flex", alignItems: "center" }}
          >
            Rating:{" "}
            <Rating name="read-only" value={parseInt(rating)} readOnly />
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Review;
