import { Box, Grid, Container } from "@mui/material";
import Spinner from "@/components/Shared/Spinner";
import { useState } from "react";
import type IShippingInfo from "@/types/shippingInfo.type";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";
import ShippingInformation from "./ShippingInformation";
import {
  useGetUserShippingInformationsQuery,
  useCreateShippingInformationMutation,
  useUpdateShippingInformationMutation,
  useDeleteShippingInformationMutation,
} from "@/redux/features/shipping/shippingInformationApi";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/auth/authSlice";
import { selectCartProducts } from "@/redux/features/cart/cartSlice";

const Checkout = () => {
  const user = useAppSelector(selectUser);
  const products = useAppSelector(selectCartProducts);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [selectedShippingId, setSelectedShippingId] = useState<string | null>(
    null,
  );
  const [isNewShippingInfo, setIsNewShippingInfo] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const totalPrice = products.reduce(
    (acc, cur) => (acc += cur.price * cur.quantity),
    0,
  );
  const formattedProducts = products.map((product) => ({
    _id: product._id,
    quantity: product.quantity,
  }));

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
    _id: "",
    user: "",
    street: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    apt: "",
  });

  // Handle shipping information selection
  const handleSelectShipping = (id: string | null) => {
    if (!id) {
      setIsNewShippingInfo(true);
      setSelectedShippingId(null);
      setShippingInformations({
        _id: "",
        user: "",
        street: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        apt: "",
      });
    } else {
      const selectedInfo = userShippingData?.data?.find(
        (info) => info._id === id,
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
    shippingData: Partial<IShippingInfo>,
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
      console.error("Error saving shipping information:", error);
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
          _id: "",
          user: "",
          street: "",
          country: "",
          state: "",
          city: "",
          zipCode: "",
          apt: "",
        });
      }
    } catch (error) {
      console.error("Error deleting shipping information:", error);
    }
  };

  if (!totalPrice || isLoadingShipping) return <Spinner />;
  return (
    <Box sx={{ background: "#F2EEF5" }}>
      <Container>
        <Grid container sx={{ pt: 3 }}>
          <Grid size={{ lg: 8 }}>
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
            <PaymentMethods
              totalPrice={Number(totalPrice)}
              setPaymentMethod={setPaymentMethod}
            />
          </Grid>
          <Grid size={{ lg: 4 }}>
            <OrderSummary
              totalPrice={Number(totalPrice)}
              paymentMethod={paymentMethod}
              shippingInformations={shippingInformations}
              formattedProducts={formattedProducts}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
