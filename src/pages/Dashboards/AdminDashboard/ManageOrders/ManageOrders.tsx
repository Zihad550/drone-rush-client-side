import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Alert,
  Button,
  ButtonGroup,
  Chip,
  IconButton,
  Snackbar,
  Typography,
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
import axios from "axios";
import React, { useEffect, useState } from "react";
import type IOrder from "@/types/OrderType";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/auth/authSlice";

interface Column {
  id: number;
  label: string;
  minWidth?: number;
}

const ManageOrders = () => {
  // hooks
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [status, setStatus] = useState<"All" | "pending" | "Shipped">("All");
  const [isUpdated, setIsUpdated] = useState(false);
  const [error, setError] = useState("");
  const user = useAppSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setIsUpdated(false);
    const controller = new AbortController();
    (async () => {
      setOrders(
        await axios
          .get(`http://localhost:8000/orders?status=${status}`, {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
            },
          })
          .then((res) => res.data),
      );
    })();

    return () => {
      controller.abort();
    };
  }, [status, isUpdated]);

  // handle status
  const handleUpdateStatus = (id: string) => {
    axios({
      method: "patch",
      url: "http://localhost:8000/orders",
      data: { _id: id, orderStatus: "Shipped" },
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then(({ data }) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          setIsUpdated(true);
        }
      })
      .catch((error) => setError(error.message));
  };

  const handleStatus = (e: any) => {
    setStatus(e.target.innerText);
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

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: "80vh" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <>
                    <TableCell
                      key={column.id}
                      style={{
                        minWidth: column.minWidth,
                      }}
                    >
                      {column.label}
                      {column.label === "Status" && (
                        <>
                          <Button
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={handleClick}
                          >
                            <IconButton>
                              <MoreVertIcon />
                            </IconButton>
                          </Button>
                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}
                          >
                            <MenuItem onClick={handleStatus}>All</MenuItem>
                            <MenuItem onClick={handleStatus}>Shipped</MenuItem>
                            <MenuItem onClick={handleStatus}>pending</MenuItem>
                          </Menu>
                        </>
                      )}
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={order._id}>
                  {/* product img & name */}
                  <TableCell sx={{ width: { md: "13%", xs: "15%" } }}>
                    <img src={order.img} alt={order.productName} />
                    <Typography variant="body2">{order.productName}</Typography>
                  </TableCell>
                  {/* customer details */}
                  <TableCell>
                    <Typography variant="body2">
                      Name: {order.userName}
                    </Typography>
                    <Typography variant="body2">
                      Email: {order.email}
                    </Typography>
                    <Typography variant="body2">
                      Phone: {order.phone}
                    </Typography>
                  </TableCell>
                  <TableCell>$ {order.price}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.orderStatus}
                      color={
                        order.orderStatus === "Shipped" ? "success" : "warning"
                      }
                    />
                  </TableCell>
                  {/* order actions */}
                  <TableCell>
                    <ButtonGroup size="small" variant="outlined">
                      <Button
                        disabled={order.orderStatus === "Shipped"}
                        color="warning"
                        onClick={() => handleUpdateStatus(order._id)}
                      >
                        Update Status
                      </Button>
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
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
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
