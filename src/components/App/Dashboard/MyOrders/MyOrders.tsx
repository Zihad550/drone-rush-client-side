import CancelIcon from "@mui/icons-material/Cancel";
import { IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import IOrder from "../../../../types/OrderType";
import Modal from "../../../Shared/Modal";
import Spinner from "../../../Shared/Spinner";

const MyOrders = () => {
  const [orders, setOrders] = useState<IOrder[] | null>(null);
  const { user, token } = useAuth();
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
    // hide last border
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

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      setOrders(
        await axios
          .get(`/orders/myOrders?email=${user.email}`, {
            headers: {
              authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          })
          .then((res) => res.data)
      );
    })();

    return () => {
      controller.abort();
    };
  }, [user.email]);

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
                    <IconButton
                      title="Cancel Order"
                      onClick={() =>
                        handleCancelOrder({
                          email: user.email,
                          productId: order._id,
                        })
                      }
                    >
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
