import { Container, Grid, Typography } from "@mui/material";
import Spinner from "components/Shared/Spinner";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { removeFromCart } from "redux/actions/cartAction";
import { AppState } from "redux/store";
import CartMenu from "./CartMenu/CartMenu";
import CartProduct from "./CartProduct/CartProduct";

const Cart = () => {
  // cart data
  const products = useSelector((state: AppState) => state.cart);
  console.log(products.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!products.length) {
    navigate("/");
    return <Spinner />;
  }

  const productPrices: number[] = products.map((product) =>
    Number(product.price)
  );

  const shippingCosts: number[] = products.map((product) =>
    Number(product.shipping)
  );

  const subTotal: number = productPrices.reduce(
    (previous, current) => previous + current
  );

  const shippingCost: number = shippingCosts.reduce(
    (previous, current) => previous + current
  );

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
    if (products.length === 0) navigate("/");
  };

  return (
    <Container sx={{ minHeight: "70vh", py: 5 }}>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {/* products */}
        <Grid item md={8} xs={12}>
          {/* cart title */}
          <Grid
            container
            sx={{
              borderBottom: "1px solid gray",
              display: { xs: "none", sm: "flex" },
            }}
          >
            <Grid item md={6}>
              <Typography variant="h5">Product</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Price
              </Typography>
            </Grid>

            <Grid item md={2}>
              <Typography variant="h5" sx={{ textAlign: "center" }}>
                Remove
              </Typography>
            </Grid>
          </Grid>
          {/*============
           product
           ============= */}

          {products ? (
            products.map((product) => (
              <CartProduct
                handleRemoveFromCart={handleRemoveFromCart}
                key={product._id}
                product={product}
              />
            ))
          ) : (
            <Spinner />
          )}
        </Grid>

        {/*=========== 
          cart
          ================ */}
        <CartMenu subTotal={subTotal} shippingCost={shippingCost} />
      </Grid>
    </Container>
  );
};

export default Cart;
