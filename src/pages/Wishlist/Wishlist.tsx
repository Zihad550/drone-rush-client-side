import {
  addProductToCard,
  selectCartProducts,
} from '@/redux/features/cart/cartSlice';
import {
  removeProductFromWishlist,
  selectWishlistProducts,
} from '@/redux/features/wishlist/wishlistSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import type IProduct from '@/types/product.type';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { toast } from 'sonner';

const Wishlist = () => {
  // cart data
  // const products = useSelector((state: AppState) => state.wishlist);
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const products: IProduct[] = useAppSelector(selectWishlistProducts);
  const cartProducts = useAppSelector(selectCartProducts);

  const isInCart = (id: string) => cartProducts.some((item) => item._id === id);

  if (!products.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography>No products in wishlist.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: 'primary.main',
            textAlign: 'center',
          }}
        >
          Wishlist
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 1, sm: 3 },
            borderRadius: 3,
            boxShadow: '0 4px 24px 0 rgba(30,41,59,0.10)',
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Remove</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id} hover>
                    <TableCell>
                      <IconButton
                        onClick={() => {
                          dispatch(removeProductFromWishlist(product._id));
                          toast.success('Removed from wishlist!');
                        }}
                      >
                        <CancelOutlinedIcon fontSize="large" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
                      >
                        <img
                          src={product.img}
                          alt={product.name}
                          width={48}
                          height={48}
                          style={{ borderRadius: 8, objectFit: 'cover' }}
                        />
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {product.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">${product.price}</Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                          bgcolor: isInCart(product._id)
                            ? 'primary.light'
                            : undefined,
                          boxShadow: isInCart(product._id) ? 2 : 1,
                          color: isInCart(product._id) ? 'white' : undefined,
                          '&.Mui-disabled': {
                            bgcolor: 'primary.light',
                            color: 'white',
                            boxShadow: 2,
                            opacity: 1,
                            cursor: 'not-allowed',
                          },
                        }}
                        onClick={() => {
                          if (!isInCart(product._id)) {
                            dispatch(addProductToCard(product));
                            toast.success('Added to cart!');
                          }
                        }}
                        disabled={isInCart(product._id)}
                      >
                        {isInCart(product._id) ? 'In Cart' : 'Add to Cart'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Box>
  );
};

export default Wishlist;
