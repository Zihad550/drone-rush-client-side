import Modal from "@/components/Shared/Modal";
import Spinner from "@/components/Shared/Spinner";
import { selectToken, selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import type IOrder from "@/types/OrderType";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect, useState } from "react";

const MyOrders = () => {
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  // !! use prover type
  const [orders, setOrders] = useState<IOrder[] | null>(null);

  useEffect(() => {
    (async () => {
      setOrders(
        await axios
          .get(`http://localhost:8000/orders/${user?.id}`, {
            headers: {
              Authorization: token,
            },
          })
          .then((res) => res.data),
      );
    })();
  }, []);

  const [isDeleted, setIsDeleted] = useState(false);

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const handleCancelOrder = ({
    email,
    productId,
  }: {
    email: string | null;
    productId: string;
  }) => {
    if (window.confirm("Are you sure!")) {
      /* axiosInstance
        .delete(`/orders?email=${email}&&id=${productId}`)
        .then(({ data }) => {
          if (data.deletedCount > 0) {
            window.location.reload();
          }
        }); */
    }
  };
  console.log(orders);
  if (!orders) return <Spinner />;
  if (orders.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h3">You don't have any orders.</Typography>
      </Box>
    );
  }
  return (
    <>
      {/* modal */}
      {isDeleted && (
        <Modal
          message="Drone deleted successfully"
          severity="success"
          setClose={setIsDeleted}
        />
      )}

      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        My Orders
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Drone Name</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Order Status</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders ? (
              orders.map((order) => (
                <StyledTableRow key={order._id}>
                  <StyledTableCell sx={{ width: "100px" }} scope="row">
                    <img src={order.img} style={{ width: "100px" }} />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {order.productName}
                  </StyledTableCell>
                  <StyledTableCell align="left">{order.disc}</StyledTableCell>
                  <StyledTableCell
                    sx={{ width: "100px" }}
                    align="left"
                  >{`$ ${order.price}`}</StyledTableCell>
                  <StyledTableCell
                    sx={{
                      width: "100px",
                    }}
                    align="left"
                  >
                    <Box
                      sx={{
                        textAlign: "center",
                        color: "white",
                        py: 1,
                        px: 1.5,
                        borderRadius: 3,
                        fontWeight: "bold",
                        background:
                          order.orderStatus === "pending" ? "red" : "green",
                      }}
                    >
                      {order.orderStatus}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton title="Cancel Order">
                      <CancelIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <Spinner />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyOrders;
