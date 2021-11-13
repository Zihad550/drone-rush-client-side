import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ManageOrder from "../ManageOrder/ManageOrder";

const ManageAllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  });
  return (
    <div>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Manage Orders
      </Typography>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {orders.map((order) => (
          <ManageOrder order={order} key={order._id} />
        ))}
      </Grid>
    </div>
  );
};

export default ManageAllOrders;
