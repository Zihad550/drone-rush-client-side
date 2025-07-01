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
import axios from "axios";
import Modal from "@/components/Shared/Modal";
import Spinner from "@/components/Shared/Spinner";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/auth/authSlice";
import type IOrder from "@/types/OrderType";

const Purchased = () => {
  const [purchasedProducts, setPurchasedProducts] = useState<IOrder[] | null>(
    null,
  );
  const user = useAppSelector(selectUser);
  console.log(user);
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

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      setPurchasedProducts(
        await axios
          .get(`http://localhost:8000/purchases`, {
            signal: controller.signal,
          })
          .then((res) => res.data),
      );
    })();

    return () => {
      controller.abort();
    };
  }, []);

  if (!purchasedProducts) return <Spinner />;
  if (purchasedProducts.length === 0) {
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
            {purchasedProducts.map((product) => (
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
