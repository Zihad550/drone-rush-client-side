import Spinner from "@/components/Shared/Spinner";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import type { TOrderStatus } from "@/types";
import { Alert, Box, ButtonGroup, Snackbar, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import UpdateOrderStatusModal from "./UpdateStatusModal";

interface Column {
  id: number;
  label: string;
  minWidth?: number;
}

const orderStatusOptions: { value: TOrderStatus; label: string }[] = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "processing",
    label: "Processing",
  },
  {
    value: "packaged",
    label: "Packaged",
  },
  {
    value: "delivering",
    label: "Delivering",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "admin-cancelled",
    label: "Admin cancelled",
  },
];

const ManageOrders = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useGetOrdersQuery({
    page,
    fields: ["product", "status"],
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const columns: readonly Column[] = [
    { id: 1, label: "Products", minWidth: 200 },
    { id: 2, label: "Customer", minWidth: 120 },
    { id: 3, label: "Total Price", minWidth: 100 },
    { id: 4, label: "Status", minWidth: 100 },
    { id: 5, label: "Actions", minWidth: 170 },
  ];

  if (isLoading) return <Spinner />;
  if (!data?.data) return <p>No orders</p>;
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data?.map((order) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                  {/* products */}
                  <TableCell>
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
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Qty: {product.quantity ?? 1}
                              </Typography>
                            </Box>
                          ) : (
                            <Typography key={idx} variant="body2">
                              {String(product.id)}
                            </Typography>
                          ),
                        )}
                    </Box>
                  </TableCell>
                  {/* customer details */}
                  <TableCell>
                    <Typography variant="body2">
                      Name:{" "}
                      {String(
                        typeof order.user === "object" &&
                          order.user !== null &&
                          "name" in order.user
                          ? order.user.name
                          : order.user,
                      )}
                    </Typography>
                    <Typography variant="body2">
                      Email:{" "}
                      {String(
                        typeof order.user === "object" &&
                          order.user !== null &&
                          "email" in order.user
                          ? order.user.email
                          : "",
                      )}
                    </Typography>
                    <Typography variant="body2">
                      Phone:{" "}
                      {String(
                        typeof order.user === "object" &&
                          order.user !== null &&
                          "phone" in order.user
                          ? order.user.phone
                          : "",
                      )}
                    </Typography>
                  </TableCell>
                  {/* total price */}
                  <TableCell>
                    <Typography variant="body2">${order.totalPrice}</Typography>
                  </TableCell>
                  {/* status */}
                  <TableCell>
                    <Typography variant="body2">{order.status}</Typography>
                  </TableCell>
                  {/* order actions */}
                  <TableCell>
                    <ButtonGroup size="small" variant="outlined">
                      <UpdateOrderStatusModal
                        status={order.status}
                        id={order._id}
                        orderStatusOptions={orderStatusOptions}
                      />
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.meta?.total ?? 0}
          rowsPerPage={data?.meta?.limit ?? 10}
          page={data?.meta?.page ?? 0}
          onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Snackbar
        open={isUpdated}
        autoHideDuration={6000}
        onClose={() => setIsUpdated(false)}
      >
        <Alert
          onClose={() => setIsUpdated(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Updated Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={error.length > 0}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert
          onClose={() => setError("")}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ManageOrders;
