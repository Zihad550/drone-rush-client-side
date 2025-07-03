import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Modal from "@/components/Shared/Modal";
import Spinner from "@/components/Shared/Spinner";
import { useState } from "react";
import { useGetUserOrdersQuery } from "@/redux/features/order/orderApi";

const Purchased = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const { data, isLoading } = useGetUserOrdersQuery({ status: "completed" });
  console.log(data);

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

  if (isLoading) return <Spinner />;
  if (!data?.data || !data.data.length) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h3">
          You don't have any purchased products.
        </Typography>
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
        My Purchases
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
            {data.data.map((product) => (
              <StyledTableRow key={product._id}>
                <StyledTableCell sx={{ width: "100px" }} scope="row">
                  <img src={product.img} style={{ width: "100px" }} />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {product.productName}
                </StyledTableCell>
                <StyledTableCell align="left">{product.disc}</StyledTableCell>
                <StyledTableCell
                  sx={{ width: "100px" }}
                  align="left"
                >{`$ ${product.price}`}</StyledTableCell>
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
                        product.orderStatus === "pending" ? "red" : "green",
                    }}
                  >
                    {product.orderStatus}
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Purchased;
