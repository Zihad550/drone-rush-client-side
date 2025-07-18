import Modal from "@/components/Shared/Modal";
import Spinner from "@/components/Shared/Spinner";
import {
  useGetUserOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/features/order/orderApi";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, IconButton, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { toast } from "sonner";

const MyOrders = () => {
  const { data, isLoading } = useGetUserOrdersQuery({});
  const [updateOrderStatus, { isLoading: isUpdatingStatus }] =
    useUpdateOrderStatusMutation();

  const [isDeleted, setIsDeleted] = useState(false);

  if (isLoading || isUpdatingStatus) return <Spinner />;

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

  const handleCancelOrder = async (orderId: string) => {
    const toastId = toast.loading("Cancelling order...");
    const confirmation = window.confirm("Are you sure!");
    if (!confirmation) return;
    try {
      await updateOrderStatus({
        payload: { status: "user-cancelled", cancelReason: "" },
        id: orderId,
      }).unwrap();

      toast.success("Order cancelled!", { id: toastId });
    } catch (err: any) {
      if (err?.data?.message) {
        toast.error(err.data.message, { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  };
  if (!data?.data || data?.data.length === 0) {
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
              <StyledTableCell>Products</StyledTableCell>
              <StyledTableCell align="left">Total Price</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((order) => (
              <StyledTableRow key={order._id}>
                <StyledTableCell>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    {Array.isArray(order.products) &&
                      order.products.map((product, idx) =>
                        typeof product.id === "object" &&
                        product.id !== null ? (
                          <Box
                            key={product.id._id ?? idx}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <img
                              src={product.id.img ?? ""}
                              alt={product.id.name ?? ""}
                              width={40}
                              height={40}
                              style={{ borderRadius: 6, objectFit: "cover" }}
                            />
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 600 }}
                            >
                              {product.id.name ?? ""}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Qty: {product.id.quantity ?? 1}
                            </Typography>
                          </Box>
                        ) : (
                          <Typography key={idx} variant="body2">
                            {String(product.id)}
                          </Typography>
                        ),
                      )}
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="left">
                  {order?.totalPrice}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Chip
                    label={order.status}
                    color={order.status === "completed" ? "success" : "warning"}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    title="Cancel Order"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    <CancelIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyOrders;
