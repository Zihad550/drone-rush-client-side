import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Grid, IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import IProduct from "types/ProductType";

interface ICartProductProps {
  product: IProduct;
  handleRemoveFromCart: (id: string) => void;
}
const CartProduct = ({ product, handleRemoveFromCart }: ICartProductProps) => {
  const { name, price, img, _id, qty } = product;
  return (
    <Grid
      container
      sx={{
        borderBottom: "1px solid gray",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
      }}
      spacing={{ md: 2, xs: 1 }}
    >
      {/* product */}
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: { md: "row", xs: "column" },
        }}
        item
        md={6}
        xs={12}
      >
        <Box>
          <img src={img} alt="" />
        </Box>
        <Typography sx={{ ml: 1 }} variant="h6">
          {name}
        </Typography>
      </Grid>
      {/* Price */}
      <Grid
        item
        md={4}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Typography variant="h5">$ {price}</Typography>
      </Grid>
      <Grid
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        item
        md={2}
        xs={12}
      >
        <IconButton>
          <RemoveCircleOutlineIcon />
        </IconButton>
        <TextField type="number" value={qty} />
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
      </Grid>
      <Grid
        item
        md={2}
        xs={12}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">$ {product.price}</Typography>
      </Grid>
      {/* Cancel */}
      <Grid
        item
        md={2}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={() => handleRemoveFromCart(_id)}>
          <CancelOutlinedIcon fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default React.memo(CartProduct);
