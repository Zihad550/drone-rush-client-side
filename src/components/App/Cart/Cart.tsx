import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import IProduct from "../../../types/ProductType";
import Footer from "../../Shared/Footer";
import Header from "../../Shared/Header";
import Spinner from "../../Shared/Spinner";
import CartMenu from "./CartMenu/CartMenu";
import CartProduct from "./CartProduct/CartProduct";

const Cart = () => {
  // context api
  const { user } = useAuth();
  // states
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (id: string) => {
    fetch(`https://limitless-crag-38673.herokuapp.com/cart?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        data.deletedCount > 0 && setIsDeleted(true);
        alert("successfully deleted");
      });
  };
  useEffect(() => {
    setIsDeleted(false);
    fetch(
      `https://limitless-crag-38673.herokuapp.com/cart/product?email=${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [isDeleted]);

  return (
    <>
      <Header />
      {/* main cart */}
      <Container sx={{ minHeight: "50vh" }}>
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
                  Cancel
                </Typography>
              </Grid>
            </Grid>
            {/*============
           product
           ============= */}

            {products ? (
              products.map((product) => (
                <CartProduct
                  key={product._id}
                  product={product}
                  handleDelete={handleDelete}
                />
              ))
            ) : (
              <Spinner />
            )}
          </Grid>

          {/*=========== 
          cart
          ================ */}
          <CartMenu />
        </Grid>
      </Container>

      {/* footer */}
      <Footer />
    </>
  );
};

export default React.memo(Cart);
