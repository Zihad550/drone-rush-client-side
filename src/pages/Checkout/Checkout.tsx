import Spinner from '@/components/Shared/Spinner';
import { selectUser } from '@/redux/features/auth/authSlice';
import { selectCartProducts } from '@/redux/features/cart/cartSlice';
import {
  useCreateShippingInformationMutation,
  useDeleteShippingInformationMutation,
  useGetUserShippingInformationsQuery,
  useUpdateShippingInformationMutation,
} from '@/redux/features/shipping/shippingInformationApi';
import { useAppSelector } from '@/redux/hooks';
import type IShippingInfo from '@/types/shippingInfo.type';
import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import PaymentMethods from './PaymentMethods';
import ShippingInformation from './ShippingInformation';

const Checkout = () => {
  const user = useAppSelector(selectUser);
  const products = useAppSelector(selectCartProducts);
  const [selectedShippingId, setSelectedShippingId] = useState<string | null>(
    null
  );
  const [isNewShippingInfo, setIsNewShippingInfo] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const totalPrice = products.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity),
    0
  );

  // API hooks
  const { data: userShippingData, isLoading: isLoadingShipping } =
    useGetUserShippingInformationsQuery();
  const [createShippingInfo, { isLoading: isCreating }] =
    useCreateShippingInformationMutation();
  const [updateShippingInfo, { isLoading: isUpdating }] =
    useUpdateShippingInformationMutation();
  const [deleteShippingInfo, { isLoading: isDeleting }] =
    useDeleteShippingInformationMutation();

  const [shippingInformations, setShippingInformations] = useState<
    Partial<IShippingInfo>
  >({
    _id: '',
    user: '',
    street: '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
    apt: '',
  });

  // Handle shipping information selection
  const handleSelectShipping = (id: string | null) => {
    if (!id) {
      setIsNewShippingInfo(true);
      setSelectedShippingId(null);
      setShippingInformations({
        _id: '',
        user: '',
        street: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        apt: '',
      });
    } else {
      const selectedInfo = userShippingData?.data?.find(
        (info) => info._id === id
      );
      if (selectedInfo) {
        setIsNewShippingInfo(false);
        setSelectedShippingId(id);
        setShippingInformations({
          street: selectedInfo.street,
          country: selectedInfo.country,
          state: selectedInfo.state,
          city: selectedInfo.city,
          zipCode: selectedInfo.zipCode,
          apt: selectedInfo.apt,
        });
      }
    }
    setIsEditing(false);
  };

  // Save new shipping information
  const handleSaveShippingInfo = async (
    shippingData: Partial<IShippingInfo>
  ) => {
    try {
      if (isNewShippingInfo) {
        shippingData.user = user?.id;
        delete shippingData._id;
        const result = await createShippingInfo(shippingData).unwrap();
        if (result.success && result.data) {
          setSelectedShippingId(result.data._id);
          setIsNewShippingInfo(false);
        }
      } else if (selectedShippingId && isEditing) {
        await updateShippingInfo({
          id: selectedShippingId,
          payload: shippingData,
        }).unwrap();
      }
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving shipping information:', error);
    }
  };

  // Delete shipping information
  const handleDeleteShippingInfo = async (id: string) => {
    try {
      await deleteShippingInfo(id).unwrap();
      if (id === selectedShippingId) {
        setSelectedShippingId(null);
        setIsNewShippingInfo(true);
        setShippingInformations({
          _id: '',
          user: '',
          street: '',
          country: '',
          state: '',
          city: '',
          zipCode: '',
          apt: '',
        });
      }
    } catch (error) {
      console.error('Error deleting shipping information:', error);
    }
  };

  const steps = ['Shipping', 'Payment', 'Review'];
  const activeStep = 1; // Example: currently on Payment

  if (!totalPrice || isLoadingShipping) return <Spinner />;
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
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 3,
            boxShadow: '0 4px 24px 0 rgba(30,41,59,0.10)',
          }}
        >
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
            <Box flex={2}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Shipping Information
              </Typography>
              <ShippingInformation
                shippingInformations={shippingInformations}
                setShippingInformations={setShippingInformations}
                userShippingInfos={userShippingData?.data || []}
                selectedShippingId={selectedShippingId}
                onSelectShipping={handleSelectShipping}
                onSaveShipping={handleSaveShippingInfo}
                onDeleteShipping={handleDeleteShippingInfo}
                isNewShippingInfo={isNewShippingInfo}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                isLoading={isCreating || isUpdating || isDeleting}
              />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Payment Method
              </Typography>
              <PaymentMethods totalPrice={Number(totalPrice)} />
            </Box>
            <Box flex={1}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Order Summary
              </Typography>
              <Box sx={{ bgcolor: 'grey.100', borderRadius: 2, p: 2, mb: 2 }}>
                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Subtotal</Typography>
                    <Typography>$199.00</Typography>
                  </Stack>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography>Shipping</Typography>
                    <Typography>$10.00</Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                    <Typography sx={{ fontWeight: 700 }}>$209.00</Typography>
                  </Stack>
                </Stack>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ borderRadius: 2, fontWeight: 700 }}
              >
                Place Order
              </Button>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default Checkout;
