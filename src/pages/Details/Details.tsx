import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
  Box,
  Container,
} from "@mui/material";
// import Spinner from "@/components/Shared/Spinner";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router";
// import IProduct from "@/types/ProductType";
import RatingChart from "./RatingChart";
import { useParams } from "react-router";
import { useGetProductQuery } from "@/redux/features/product/productApi";
import Spinner from "@/components/Shared/Spinner";
import { useAppDispatch } from "@/redux/hooks";
import { addProductToCard } from "@/redux/features/cart/cartSlice";

const calculateRatings = (ratings: number[]) => {
  if (!ratings.length)
    return {
      totalRatings: 0,
      averageRating: 0,
      fiveStars: 0,
      fourStars: 0,
      threeStars: 0,
      twoStars: 0,
      oneStars: 0,
    };

  const totalRatings: number = ratings.length;
  const averageRating: number =
    Number(ratings.reduce((previous, current) => previous + current)) /
    totalRatings;
  const fiveStars = ratings.filter((rating) => rating === 5).length;
  const fourStars = ratings.filter((rating) => rating === 4).length;
  const threeStars = ratings.filter((rating) => rating === 3).length;
  const twoStars = ratings.filter((rating) => rating === 2).length;
  const oneStars = ratings.filter((rating) => rating === 1).length;

  return {
    totalRatings,
    averageRating,
    fiveStars,
    fourStars,
    threeStars,
    twoStars,
    oneStars,
  };
};

const Details = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const { data, isLoading } = useGetProductQuery(id as string);

  if (isLoading) return <Spinner />;

  const { img, name, price, reviews, brand } = data.data;
  const ratings: number[] =
    reviews.map((review) => Number(review.rating)) || [];

  const {
    totalRatings,
    averageRating,
    fiveStars,
    fourStars,
    threeStars,
    twoStars,
    oneStars,
  } = calculateRatings(ratings);
  return (
    <Box sx={{ background: "#f2eef5" }}>
      <Container maxWidth="md">
        {/* booking section */}
        <Grid
          sx={{
            alignItems: "center",
            py: 5,
            px: 2,
            background: "#fffffe",
            boxSizing: "border-box",
          }}
          container
        >
          {/* product image */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <img
              style={{ width: "100%", height: "auto" }}
              src={img}
              alt={`image of ${name}`}
            />
          </Grid>

          {/* product details */}
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* name */}
            <Typography variant="h4">{name}</Typography>

            {/* rating & brand & share & wishlist */}
            <Box
              sx={{ my: 2, display: "flex", justifyContent: "space-between" }}
            >
              {/* rating & brand */}
              <Box>
                {/* ratings */}
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Rating
                    size="small"
                    sx={{ mr: 1 }}
                    readOnly
                    value={averageRating}
                  />
                  <Typography variant="body2" sx={{ color: "#4fc4cf" }}>
                    {totalRatings} Ratings
                  </Typography>
                </Box>
                {/* brand */}
                <Box sx={{ display: "flex" }}>
                  <Typography variant="body2" sx={{ color: "gray", mr: 1 }}>
                    Brand:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#4fc4cf" }}>
                    {brand.name}
                  </Typography>
                </Box>
              </Box>

              {/* share & wishlist */}
              <Box>
                <IconButton>
                  <ShareIcon />
                </IconButton>
                <IconButton
                  onClick={
                    () => {}
                    // user
                    //   ? () => dispatch(addToWishlist(data))
                    //   : () => navigate("/login")
                  }
                >
                  <FavoriteBorderIcon />
                </IconButton>
              </Box>
            </Box>

            {/* price */}
            <Typography variant="body1" sx={{ fontSize: 30, color: "#ffc800" }}>
              &#36; {price}
            </Typography>

            {/* actions */}
            <Button
              onClick={() => dispatch(addProductToCard(data.data))}
              variant="contained"
              sx={{ color: "white" }}
            >
              Add To Cart
            </Button>
          </Grid>
        </Grid>

        {/* review section */}
        <Paper
          sx={{ background: "#fffffe", width: "100%", px: 2, pb: 5, mt: 1 }}
        >
          <Typography variant="subtitle1" sx={{ pt: 1 }}>
            Ratings &#38; Reviews of {name}
          </Typography>

          <Box sx={{ display: "flex", mt: 5 }}>
            {/* average & total rating */}
            <Box>
              {/* average rating */}
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Typography variant="body1" sx={{ fontSize: 50 }}>
                  {averageRating}
                </Typography>
                <Typography color="gray" variant="body1" sx={{ fontSize: 40 }}>
                  /5
                </Typography>
              </Box>
              {/* total rating */}
              <Box>
                <Rating value={averageRating} readOnly size="large" />
                <Typography variant="body2" color="gray">
                  {totalRatings} Ratings
                </Typography>
              </Box>
            </Box>

            {/* rating chart */}
            <RatingChart
              totalRatings={totalRatings}
              fiveStars={fiveStars}
              fourStars={fourStars}
              threeStars={threeStars}
              twoStars={twoStars}
              oneStars={oneStars}
            />
          </Box>

          {/* all reviews */}
          <Box sx={{ mt: 5 }}>
            <Typography variant="body1">Product Reviews</Typography>
            {reviews?.map((review) => (
              <Box sx={{ mt: 2 }}>
                <Rating value={Number(review.rating)} readOnly />
                <Typography variant="body2">by {review.user}</Typography>
                <Typography variant="body1">{review.comment}</Typography>
              </Box>
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Details;
