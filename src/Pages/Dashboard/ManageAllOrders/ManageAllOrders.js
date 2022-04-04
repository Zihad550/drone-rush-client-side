import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";

const ManageAllOrders = () => {
  // hooks
  const [orders, setOrders] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  
  useEffect(() => {
    setIsUpdated(false)
    fetch("https://still-castle-43681.herokuapp.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [isUpdated]);

  // handle status
  const handleStatus = (order) => {
    fetch(`https://still-castle-43681.herokuapp.com/orders/${order._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({...order, orderStatus: "Shipped"}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          alert("Status successfully updated");
          setIsUpdated(true)
        }
      });
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));  
  return (
    <>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Manage Orders
      </Typography>
      

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Drone Name</StyledTableCell>
            <StyledTableCell>Customer Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="left">Status</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <StyledTableRow key={order._id}>
              <StyledTableCell sx={{width: '100px'}} component="img" src={order.img} scope="row" />
              <StyledTableCell component="th" scope="row">
                {order.productName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {order.userName}
              </StyledTableCell>
              <StyledTableCell align="left">{order.disc}</StyledTableCell>
              <StyledTableCell align="left" sx={{width: '100px'}}>{`$ ${order.price}`}</StyledTableCell>
              <StyledTableCell align="left">{order.orderStatus}</StyledTableCell>
              <StyledTableCell   align="center" ><IconButton disabled={order.orderStatus === 'Shipped' ? true : false} title="Update to shipped" onClick={() => handleStatus(order)}><CheckCircleIcon/></IconButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default ManageAllOrders;
