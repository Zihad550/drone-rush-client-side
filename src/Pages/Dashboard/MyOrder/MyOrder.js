import { ArrowForward, Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import ReviewModal from "../ReviewModal/ReviewModal";

import { makeStyles } from "@mui/styles";

const MyOrder = ({ myOrder }) => {
  const { img, productName, price, disc, _id, orderStatus } = myOrder;
  const { user } = useAuth();

  const theme = useTheme();
  const useStyle = makeStyles({
    directionRow: {
      [theme.breakpoints.up("sm")]: {
        display: "flex !important",
      },
    },
  });

  const { directionRow } = useStyle();

  const location = useLocation();

  const handleCancelOrder = () => {
    if (window.confirm("Are you sure!")) {
      fetch(
        `https://still-castle-43681.herokuapp.com/orders?email=${user.email}&&id=${_id}`,
        {
          method: "DELETE",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            window.location.reload();
          }
        });
    }
  };
  // handle review popup
  const [openReview, setOpenReview] = useState(false);
  const handleOpenReview = () => setOpenReview(true);
  const handleCloseReview = () => setOpenReview(false);

  return (
    <Grid item xs={12} md={6}>
      <Card className={directionRow} sx={{ boxShadow: 3 }}>
        <CardMedia
          style={{ width: "100%", height: "auto" }}
          component="img"
          image={img}
        />
        <CardContent>
          <Typography variant="h5">{productName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {disc}
          </Typography>

          <Box>
            <Typography variant="h6" color="success.main" sx={{ mb: 0, mt: 3 }}>
              Price: ${price}
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
              Order status: {orderStatus}
            </Typography>
          </Box>
          <CardActions>
            {location.pathname === "/dashboard/myOrders" ? (
              <Button
                onClick={handleCancelOrder}
                sx={{ width: "100%" }}
                color="error"
                variant="contained"
                size="small"
                endIcon={<Delete />}
              >
                Cancel
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleOpenReview}
                  sx={{ width: "100%" }}
                  color="primary"
                  variant="contained"
                  size="small"
                  endIcon={<ArrowForward />}
                >
                  Give Review
                </Button>
              </>
            )}
            {openReview && (
              <ReviewModal
                product={myOrder}
                openReview={openReview}
                handleCloseReview={handleCloseReview}
              />
            )}
          </CardActions>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MyOrder;
