import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Rating,
  Typography,
} from '@mui/material';
// import Spinner from "@/components/Shared/Spinner";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router";
// import IProduct from "@/types/ProductType";
import Spinner from '@/components/Shared/Spinner';
import { selectUser } from '@/redux/features/auth/authSlice';
import {
  addProductToCard,
  selectCartProducts,
} from '@/redux/features/cart/cartSlice';
import { useGetProductQuery } from '@/redux/features/product/productApi';
import {
  addProductToWishlist,
  selectWishlistProducts,
} from '@/redux/features/wishlist/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams } from 'react-router';
import { toast } from 'sonner';
import RatingChart from './RatingChart';

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
  const user = useAppSelector(selectUser);
  const cartProducts = useAppSelector(selectCartProducts);
  const wishlistProducts = useAppSelector(selectWishlistProducts);

  if (isLoading) return <Spinner />;
  if (!data?.data)
    return (
      <Box>
        <Typography>Product details not found</Typography>
      </Box>
    );

  const inCart = cartProducts.some((item) => item._id === data.data._id);
  const inWishlist = wishlistProducts.some(
    (item) => item._id === data.data._id
  );
  const { img, name, price, reviews, brand } = data.data;
  const ratings: number[] =
    reviews.map((review: any) => Number(review.rating)) || [];

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
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        {/* booking section */}
        <Grid
          container
          spacing={4}
          alignItems="center"
          sx={{
            py: { xs: 2, md: 5 },
            px: { xs: 1, md: 2 },
            bgcolor: 'background.paper',
            borderRadius: 3,
            boxShadow: 2,
          }}
        >
          {/* product image */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Box
              component="img"
              src={img}
              alt={`image of ${name}`}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 1,
                objectFit: 'cover',
              }}
            />
          </Grid>

          {/* product details */}
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* name */}
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: 'primary.main' }}
            >
              {name}
            </Typography>

            {/* rating & brand & share & wishlist */}
            <Box
              sx={{
                my: 2,
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              {/* rating & brand */}
              <Box>
                {/* ratings */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Rating
                    size="small"
                    sx={{ mr: 1 }}
                    readOnly
                    value={averageRating}
                  />
                  <Typography variant="body2" sx={{ color: 'secondary.main' }}>
                    {totalRatings} Ratings
                  </Typography>
                </Box>
                {/* brand */}
                <Box sx={{ display: 'flex' }}>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', mr: 1 }}
                  >
                    Brand:
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'secondary.main' }}>
                    {brand.name}
                  </Typography>
                </Box>
              </Box>

              {/* share & wishlist */}
              <Box>
                <IconButton aria-label="Share">
                  <ShareIcon />
                </IconButton>
                <IconButton
                  aria-label="Add to wishlist"
                  onClick={() => {
                    if (!inWishlist) {
                      dispatch(addProductToWishlist(data.data));
                      toast.success('Added to wishlist!');
                    }
                  }}
                  disabled={inCart}
                  sx={{
                    bgcolor: inWishlist ? 'secondary.main' : 'grey.100',
                    color: inWishlist ? 'white' : 'secondary.main',
                    boxShadow: inWishlist ? 2 : 0,
                    '&:hover': {
                      bgcolor: 'secondary.main',
                      color: 'white',
                    },
                  }}
                >
                  {inWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Box>
            </Box>

            {/* price */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: 'warning.main',
                fontSize: { xs: 24, md: 30 },
              }}
            >
              &#36; {price}
            </Typography>

            {/* actions */}
            <Button
              onClick={() => dispatch(addProductToCard(data.data))}
              variant="contained"
              sx={{
                color: 'white',
                mt: 2,
                px: 4,
                py: 1,
                fontWeight: 600,
                fontSize: { xs: 16, md: 18 },
                bgcolor: inCart ? 'primary.light' : undefined,
                boxShadow: inCart ? 2 : 1,
                '&.Mui-disabled': {
                  bgcolor: 'primary.light',
                  color: 'white',
                  boxShadow: 2,
                  opacity: 1,
                  cursor: 'not-allowed',
                },
              }}
              disabled={!user || inCart}
            >
              {inCart ? 'In Cart' : 'Add To Cart'}
            </Button>
          </Grid>
        </Grid>

        {/* review section */}
        <Paper
          sx={{
            bgcolor: 'background.paper',
            width: '100%',
            px: { xs: 1, md: 2 },
            pb: 5,
            mt: 3,
            borderRadius: 3,
            boxShadow: 1,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              pt: 3,
              fontWeight: 600,
              color: 'primary.main',
              fontSize: { xs: 18, md: 22 },
            }}
          >
            Ratings &#38; Reviews of {name}
          </Typography>

          <Box sx={{ display: 'flex', mt: 5, flexWrap: 'wrap', gap: 4 }}>
            {/* average & total rating */}
            <Box>
              {/* average rating */}
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    fontSize: { xs: 36, md: 50 },
                  }}
                >
                  {averageRating}
                </Typography>
                <Typography
                  sx={{
                    color: 'text.secondary',
                    fontSize: { xs: 24, md: 40 },
                    ml: 1,
                  }}
                >
                  /5
                </Typography>
              </Box>
              {/* total rating */}
              <Box>
                <Rating value={averageRating} readOnly size="large" />
                <Typography variant="body2" color="text.secondary">
                  {totalRatings} Ratings
                </Typography>
              </Box>
            </Box>
            {/* rating chart */}
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <RatingChart
                fiveStars={fiveStars}
                fourStars={fourStars}
                threeStars={threeStars}
                twoStars={twoStars}
                oneStars={oneStars}
                totalRatings={totalRatings}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Details;
