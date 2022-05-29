import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Modal from "src/components/Shared/Modal";
import useAuth from "../../../../hooks/useAuth";
import IOrder from "../../../../types/OrderType";
import Spinner from "../../../Shared/Spinner";

const Purchased = () => {
  const [purchasedProducts, setPurchasedProducts] = useState<IOrder[] | null>(
    null
  );
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

  useEffect(() => {
    fetch(
      `https://still-castle-43681.herokuapp.com/orders/purchased?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setPurchasedProducts(data));
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
            {purchasedProducts ? (
              purchasedProducts.map((product) => (
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

export default Purchased;
