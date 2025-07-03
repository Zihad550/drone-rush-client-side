import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Alert,
  Button,
  ButtonGroup,
  Chip,
  IconButton,
  Snackbar,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import Spinner from "@/components/Shared/Spinner";
import type { TOrderStatus } from "@/types";
import AppSelect from "@/components/ui/AppSelect";
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
  {
    value: "user-cancelled",
    label: "User cancelled",
  },
];

const ManageOrders = () => {
  const [status, setStatus] = useState<TOrderStatus | undefined>(undefined);
  console.log(status);
  const [page, setPage] = useState(0);
  const { data, isLoading } = useGetOrdersQuery({
    status,
    page,
    fields: ["product", "status"],
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleStatus: (event: SelectChangeEvent) => void = (e) => {
    setStatus(e.target.value as TOrderStatus);
  };

  const columns: readonly Column[] = [
    { id: 1, label: "Product", minWidth: 150 },
    { id: 2, label: "Customer", minWidth: 100 },
    {
      id: 4,
      label: "Price",
      minWidth: 170,
    },
    {
      id: 5,
      label: "Status",
      minWidth: 170,
    },
    {
      id: 6,
      label: "Actions",
      minWidth: 170,
    },
  ];

  if (isLoading) return <Spinner />;
  if (!data?.data?.length && !status) return <p>No orders</p>;
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
                    style={{
                      minWidth: column.minWidth,
                    }}
                  >
                    {column.label === "Status" ? (
                      <AppSelect
                        sx={{ width: 150 }}
                        options={orderStatusOptions}
                        name="status"
                        label="Status"
                        defaultValue=""
                        handleChange={handleStatus}
                      />
                    ) : (
                      column.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((order) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                  {/* product img & name */}
                  <TableCell sx={{ width: { md: "13%", xs: "15%" } }}>
                    <img
                      style={{ width: 200, height: 200 }}
                      src={order.product.img}
                      alt={order.product.name}
                    />
                    <Typography variant="body2">
                      {order.product.name}
                    </Typography>
                  </TableCell>
                  {/* customer details */}
                  <TableCell>
                    <Typography variant="body2">
                      Name: {order.user.name}
                    </Typography>
                    <Typography variant="body2">
                      Email: {order.user.email}
                    </Typography>
                    <Typography variant="body2">
                      Phone: {order.user.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>$ {order.product.price}</TableCell>
                  <TableCell>
                    {/* <AppSelect
                      options={orderStatusOptions}
                      name="status"
                      label="Status"
                      defaultValue={order.status}
                      handleChange={(e) => handleStatusUpdate(order._id, status)}
                      sx={{ width: 150 }}
                    /> */}
                    <Chip label={order.status} />
                  </TableCell>
                  {/* order actions */}
                  <TableCell>
                    <ButtonGroup size="small" variant="outlined">
                      <UpdateOrderStatusModal
                        status={order.status}
                        id={order._id}
                        orderStatusOptions={orderStatusOptions}
                      />
                      <Button color="error">Delete Order</Button>
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
          count={data.meta?.total}
          rowsPerPage={rowsPerPage}
          page={data.meta.page}
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
