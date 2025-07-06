import {
  deleteProductFromCart,
  selectCartProducts,
} from '@/redux/features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const Cart = () => {
  const products = useAppSelector(selectCartProducts);
  const dispatch = useAppDispatch();

  if (!products.length)
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
        }}
      >
        <ShoppingCartOutlinedIcon
          sx={{ fontSize: 64, color: 'grey.400', mb: 2 }}
        />
        <Typography variant="h5" sx={{ color: 'grey.600', mb: 1 }}>
          Your cart is empty
        </Typography>
        <Typography variant="body1" sx={{ color: 'grey.500' }}>
          Browse products and add them to your cart!
        </Typography>
      </Box>
    );

  const subTotal = products.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity),
    0
  );

  const shippingCost: number = 50;
  const totalPrice: number = subTotal + shippingCost;

  return (
    <Box sx={{ minHeight: '80vh', py: 4, bgcolor: 'background.default' }}>
      <Box maxWidth="md" mx="auto">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: 'primary.main',
            textAlign: 'center',
          }}
        >
          Shopping Cart
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
                <TableRow sx={{ bgcolor: 'grey.100' }}>
                  <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    Price
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    Quantity
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    Total
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => {
                  return (
                    <TableRow
                      key={product._id}
                      hover
                      sx={{
                        transition: 'background 0.2s',
                        '&:hover': { bgcolor: 'grey.50' },
                      }}
                    >
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Box
                            component="img"
                            src={product.img}
                            alt={product.name}
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              objectFit: 'cover',
                              boxShadow: 1,
                            }}
                          />
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600 }}
                          >
                            {product.name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">${product.price}</TableCell>
                      <TableCell align="right">{product.quantity}</TableCell>
                      <TableCell align="right">
                        ${product.price * product.quantity}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          onClick={() =>
                            dispatch(deleteProductFromCart(product._id))
                          }
                        >
                          <CancelOutlinedIcon fontSize="large" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ my: 2 }} />
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Total: ${totalPrice}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {}}
              sx={{ borderRadius: 2, px: 4, fontWeight: 700 }}
            >
              Proceed to Checkout
            </Button>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default Cart;
