import Spinner from "@/components/Shared/Spinner";
import AppSelect from "@/components/ui/AppSelect";
import { useGetBrandsQuery } from "@/redux/features/brand/brandApi";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import type { IOption } from "@/types/global";
import type { TProductWriteDoc } from "@/types/product.type";
import { Add } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  IconButton,
  TextField,
  Typography,
  Box,
  type SelectChangeEvent,
  Grid,
} from "@mui/material";
import React, {
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
} from "react";
import { toast } from "sonner";

const AddDrone = () => {
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery({ limit: Infinity });
  const { data: brandsData, isLoading: isBrandsLoading } = useGetBrandsQuery({
    limit: Infinity,
  });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [productInfo, setProductInfo] = useState<TProductWriteDoc>({
    name: "",
    price: 0,
    img: "",
    description: "",
    brand: "",
    category: "",
    reviews: [],
    quantity: 0,
  });
  console.log(productInfo);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const field: string | number = e.target.name;
    const value = e.target.value;
    const newInfo: any = { ...productInfo };
    newInfo[field] = value;
    setProductInfo(newInfo);
  };

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Creating new product");

    try {
      const res = await createProduct(productInfo).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Product created", { id: toastId });
        setProductInfo({
          name: "",
          price: 0,
          img: "",
          description: "",
          brand: "",
          category: "",
          reviews: [],
          quantity: 0,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to create product", {
        id: toastId,
      });
    }
  };

  if (isBrandsLoading || isCategoriesLoading || isCreating) return <Spinner />;

  if (!categoriesData?.data) return <p>No categories available</p>;
  if (!brandsData?.data) return <p>No brands available</p>;

  return (
    <>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Add New Drone
      </Typography>
      <Grid
        sx={{ maxWidth: 800 }}
        spacing={1}
        container
        component="form"
        onSubmit={handleBooking}
      >
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <TextField
            required
            size="small"
            name="name"
            onChange={handleOnChange}
            label="Drone Name"
            margin="dense"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <TextField
            required
            fullWidth
            variant="outlined"
            name="price"
            margin="dense"
            onChange={handleOnChange}
            size="small"
            type="number"
            label="Drone Price"
          />
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <TextField
            required
            variant="outlined"
            name="quantity"
            fullWidth
            margin="dense"
            onChange={handleOnChange}
            size="small"
            type="number"
            label="Quantity"
          />
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <TextField
            required
            variant="outlined"
            label="Drone Image src"
            type="text"
            onChange={handleOnChange}
            size="small"
            name="img"
            fullWidth
          />
        </Grid>
        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <AppSelect
            options={categoriesData.data.map((item) => ({
              value: item._id,
              label: item.name,
            }))}
            handleChange={handleOnChange as any}
            value={productInfo.category}
            name="category"
            label="Category"
          />
        </Grid>

        <Grid size={{ md: 4, sm: 6, xs: 12 }}>
          <AppSelect
            options={brandsData.data.map((item) => ({
              value: item._id,
              label: item.name,
            }))}
            handleChange={handleOnChange as any}
            value={productInfo.brand}
            name="brand"
            label="Brands"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            required
            variant="outlined"
            type="text"
            size="small"
            margin="dense"
            multiline
            rows={3}
            onChange={handleOnChange}
            name="description"
            fullWidth
            label="Description"
          />
        </Grid>
        <Grid size={12}>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            type="submit"
            endIcon={<Add />}
          >
            Add Drone
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddDrone;
