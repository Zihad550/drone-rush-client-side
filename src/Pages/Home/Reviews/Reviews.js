import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Review from "../Review/Review";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://still-castle-43681.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <Container style={{ marginTop: "5rem" }}>
      <Typography variant="h1" sx={{ mb: 4, mx: "auto" }}>
        Product Reviews
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {reviews.map((review) => (
          <Review key={review._id} review={review} />
        ))}
      </Grid>
    </Container>
  );
};

export default Reviews;
