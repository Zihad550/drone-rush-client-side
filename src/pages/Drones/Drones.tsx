import { Pagination, Box } from "@mui/material";
import Spinner from "@/components/Shared/Spinner";
import React, { useState } from "react";
import Products from "../Home/Products";
import { useGetProductsQuery } from "@/redux/features/product/productApi";

const PRODUCTS_PER_PAGE = 8;
const Drones = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetProductsQuery({
    page,
    sort: "-quantity",
  });

  if (isLoading) return <Spinner />;

  const handleCurrentPage = (e: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <div>
      <Products products={data.data} title="All Available Drones" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 5,
        }}
      >
        <Pagination
          count={Math.ceil(data?.meta.total / PRODUCTS_PER_PAGE)}
          variant="outlined"
          color="primary"
          onChange={handleCurrentPage}
        />
      </Box>
    </div>
  );
};

export default Drones;
