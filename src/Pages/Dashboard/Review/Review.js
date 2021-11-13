import { Container, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import MyOrder from "../MyOrder/MyOrder";
import ReviewModal from "../ReviewModal/ReviewModal";

const Review = ({ myOrders }) => {
  const { user } = useAuth();

  // handle review popup
  const [openReview, setOpenReview] = useState(false);
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Give Review
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {myOrders.map((myOrder) => (
          <MyOrder
            handleOpenReview={handleOpenReview}
            myOrder={myOrder}
            key={myOrder._id}
          />
        ))}{" "}
      </Grid>
      {myOrders.map((myOrder) => (
        <ReviewModal
          product={myOrder}
          openReview={openReview}
          handleCloseReview={handleCloseReview}
        />
      ))}
    </Container>
  );
};

export default Review;
