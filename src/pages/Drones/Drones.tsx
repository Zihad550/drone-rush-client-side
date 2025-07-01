import { Pagination } from "@mui/material";
import { Box } from "@mui/system";
import Spinner from "components/Shared/Spinner";
import useAPI from "hooks/useAPI";
import React, { useState } from "react";
import ProductService from "services/Product.service";
import IProduct from "types/ProductType";
import Products from "../Home/Products";

const PRODUCTS_PER_PAGE = 8;
const Drones = () => {
  const [page, setPage] = useState(1);
  const { data } = useAPI<{ products: IProduct[]; totalProducts: number }>(
    () =>
      ProductService.getAllProducts({
        productsPerPage: PRODUCTS_PER_PAGE,
        currentPage: page,
      }),
    page
  );

  console.log("call");

  if (!data?.products) return <Spinner />;

  const handleCurrentPage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div>
      <Products products={data.products} title="All Available Drones" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 5,
        }}
      >
        <Pagination
          count={Math.ceil(data?.totalProducts / PRODUCTS_PER_PAGE)}
          variant="outlined"
          color="primary"
          onChange={handleCurrentPage}
        />
      </Box>
    </div>
  );
};

export default Drones;
