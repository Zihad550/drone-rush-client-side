import { addProductToWishlist } from '@/redux/features/wishlist/wishlistSlice';
import { useAppDispatch } from '@/redux/hooks';
import type IProduct from '@/types/product.type';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const Product = ({ drone }: { drone: IProduct }) => {
  const { name, description: disc, price, img, _id } = drone;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Placeholder handlers
  const handleAddToCart = () => {
    // Add to cart logic here
  };
  const handleAddToWishlist = () => {
    dispatch(addProductToWishlist(drone));
    toast.success('Added to wishlist!');
  };

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          boxShadow: 2,
          transition:
            'transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s',
          '&:hover': {
            transform: 'translateY(-4px) scale(1.02)',
            boxShadow: 6,
          },
          bgcolor: 'background.paper',
          p: 0.5,
          minWidth: 0,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 120,
            mb: 1,
            borderRadius: 2,
            overflow: 'hidden',
            bgcolor: 'grey.100',
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: 90,
              objectFit: 'contain',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.04)' },
            }}
            image={img}
            alt={name}
          />
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            p: 1,
            pb: '8px!important',
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5,
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
          >
            <Typography
              variant="subtitle1"
              component="h4"
              sx={{ fontWeight: 600, color: 'primary.main', fontSize: 16 }}
              noWrap
            >
              {name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="success.main"
              sx={{ fontWeight: 700, fontSize: 15 }}
            >
              ${price}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, minHeight: 28, fontSize: 13 }}
            noWrap
          >
            {disc}
          </Typography>
        </CardContent>
        <Grid
          spacing={1}
          justifyContent="space-between"
          sx={{
            mb: 1,
            px: 1,
            mt: 'auto',
          }}
          container
        >
          <Grid direction="row" spacing={1}>
            <Tooltip title="Add to cart">
              <IconButton
                size="small"
                color="primary"
                onClick={handleAddToCart}
                sx={{
                  bgcolor: 'grey.100',
                  '&:hover': { bgcolor: 'primary.light', color: 'white' },
                  borderRadius: 2,
                  m: 1,
                }}
              >
                <ShoppingCartIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add to wishlist">
              <IconButton
                size="small"
                color="secondary"
                onClick={handleAddToWishlist}
                sx={{
                  bgcolor: 'grey.100',
                  '&:hover': { bgcolor: 'secondary.main', color: 'white' },
                  borderRadius: 2,
                }}
              >
                <FavoriteBorderIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid>
            <Button
              onClick={() => navigate(`/details/${_id}`)}
              variant="contained"
              size="small"
              sx={{
                color: 'white',
                borderRadius: 2,
                fontWeight: 600,
                fontSize: 13,
                py: 0.7,
                ml: 'auto',
                boxShadow: 1,
                background: 'linear-gradient(90deg, #1976d2 0%, #21cbf3 100%)',
                transition: 'background 0.2s',
                '&:hover': {
                  background:
                    'linear-gradient(90deg, #21cbf3 0%, #1976d2 100%)',
                  boxShadow: 2,
                },
              }}
              fullWidth={false}
            >
              Details
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Product;
