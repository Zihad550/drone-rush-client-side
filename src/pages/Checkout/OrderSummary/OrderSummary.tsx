import { clearCart, selectCartProducts } from '@/redux/features/cart/cartSlice';
import { useCreateOrderMutation } from '@/redux/features/order/orderApi';
import { useGetShippingInformationByIdQuery } from '@/redux/features/shipping/shippingInformationApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {
  Box,
  Button,
  Checkbox,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useParams } from 'react-router';
import { toast } from 'sonner';

const OrderSummary = () => {
  const { 'shipping-id': shippingId } = useParams();

  const products = useAppSelector(selectCartProducts);
  const formattedProducts = products.map((product) => ({
    _id: product._id,
    quantity: product.quantity,
  }));

  const subTotal = products.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity),
    0
  );
  const shippingCost: number = 50;
  const totalPrice: number = subTotal + shippingCost;
  const [showCoupons, setShowCoupons] = useState(false);
  const dispatch = useAppDispatch();
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const { data: shippingData, isLoading: isShippingInfoLoading } =
    useGetShippingInformationByIdQuery(shippingId as string);
  const handlePlaceOrder = async () => {
    if (!shippingData?.data)
      return (
        <Box>
          <Typography>Shipping info not found...</Typography>
        </Box>
      );

    const shippingInformations = shippingData?.data;

    // validate shipping information is complete
    if (
      !shippingInformations.street ||
      !shippingInformations.city ||
      !shippingInformations.state ||
      !shippingInformations.country ||
      !shippingInformations.zipCode
    ) {
      toast.error('Please complete shipping information before placing order');
      return;
    }

    // collect details
    const orderDetails = {
      shippingInformation: shippingInformations._id,
      products: formattedProducts,
    };

    const toastId = toast.loading('Placing order...');
    try {
      const response = await createOrder(orderDetails).unwrap();
      if (response.success) {
        dispatch(clearCart());
        toast.success('Order placed successfully!', { id: toastId });
        window.location.href = '/user/dashboard/orders';
      }
    } catch (err: any) {
      if (err?.data?.message) toast.error(err.data.message, { id: toastId });
      else
        toast.error('Failed to place order. Please try again.', {
          id: toastId,
        });
    }
  };

  return (
    <Paper sx={{ p: 3, ml: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
        Order Summary
      </Typography>

      {/* coupon */}
      <Box sx={{ mb: 2 }}>
        <Button
          variant="text"
          sx={{ color: 'black', position: 'relative' }}
          onClick={() => setShowCoupons((state) => !state)}
          endIcon={showCoupons ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        >
          Select Coupon
        </Button>
        {showCoupons && (
          <Paper sx={{ position: 'absolute', zIndex: 4 }} elevation={5}>
            <MenuItem sx={{ border: 0 }} value={10}>
              <Checkbox disabled />
              No coupons available
            </MenuItem>
          </Paper>
        )}
      </Box>

      {/* promo code */}
      <Box>
        <Typography variant="caption">Promo Code</Typography>
        <Box sx={{ display: 'flex' }}>
          <TextField type="text" size="small" />
          <Button variant="outlined" color="info">
            Apply
          </Button>
        </Box>
      </Box>

      {/* total */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          my: 2,
        }}
      >
        <Typography variant="body1">Total</Typography>
        <Typography variant="body1" sx={{ fontSize: 40 }}>
          $ {totalPrice}
        </Typography>
      </Box>

      {/* place order */}
      <Button
        onClick={handlePlaceOrder}
        variant="contained"
        sx={{ color: 'white', width: '100%' }}
      >
        {isLoading || isShippingInfoLoading ? 'Processing...' : 'Place Order'}
      </Button>
    </Paper>
  );
};

export default OrderSummary;
