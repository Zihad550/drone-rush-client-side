import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import {
  Button,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import Spinner from "components/Shared/Spinner";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import IProduct from "types/ProductType";
import useAPI from "../../../hooks/useAPI";
import { addToCart } from "../../../redux/actions/cartAction";
import ProductService from "../../../services/Product.service";
import RatingChart from "./RatingChart";

const Details = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, error, status } = useAPI<IProduct>(() =>
    ProductService.getProduct(id as string)
  );
  if (!data) return <Spinner />;

  const { img, name, price, reviews, brand } = data;
  const ratings: number[] = reviews.map((review) => Number(review.rating));
  const totalRatings: number = ratings.length;
  const averageRating: number =
    Number(ratings.reduce((previous, current) => previous + current)) /
    totalRatings;
  const fiveStars = ratings.filter((rating) => rating === 5).length;
  const fourStars = ratings.filter((rating) => rating === 4).length;
  const threeStars = ratings.filter((rating) => rating === 3).length;
  const twoStars = ratings.filter((rating) => rating === 2).length;
  const oneStars = ratings.filter((rating) => rating === 1).length;

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
          <Grid item xs={12} sm={6}>
            <img
              style={{ width: "100%", height: "auto" }}
              src={img}
              alt={`image of ${name}`}
            />
          </Grid>

          {/* product details */}
          <Grid item xs={12} sm={6}>
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
                    {brand}
                  </Typography>
                </Box>
              </Box>

              {/* share & wishlist */}
              <Box>
                <IconButton>
                  <ShareIcon />
                </IconButton>
                <IconButton>
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
              onClick={() => dispatch(addToCart(data))}
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
            {reviews.map((review) => (
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
