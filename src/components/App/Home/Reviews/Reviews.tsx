import { Container, Grid, Typography } from "@mui/material";
import Spinner from "components/Shared/Spinner/Spinner";
import { useEffect, useState } from "react";
import IReview from "../../../../types/ReviewType";
import Review from "./Review";

const Reviews = () => {
  const [reviews, setReviews] = useState<IReview[] | null>(null);

  useEffect(() => {
    fetch("https://still-castle-43681.herokuapp.com/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <Container sx={{ my: 10 }}>
      <Typography variant="h1" sx={{ mb: 4, mx: "auto" }}>
        Product Reviews
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {reviews ? (
          reviews.map((review) => <Review key={review._id} review={review} />)
        ) : (
          <Spinner />
        )}
      </Grid>
    </Container>
  );
};

export default Reviews;
