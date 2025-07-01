import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Spinner from "@/components/Shared/Spinner";
import { useNavigate } from "react-router";
import CartMenu from "./CartMenu/CartMenu";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const Cart = () => {
  // cart data
  // const products = useSelector((state: AppState) => state.cart);
  const products = [];
  const navigate = useNavigate();

  console.log(products);

  if (!products.length) {
    navigate("/");
    return <Spinner />;
  }

  const productPrices: number[] = products.map((product) =>
    Number(product.totalPrice),
  );

  const shippingCosts: number[] = products.map((product) =>
    Number(product.shipping),
  );

  const subTotal: number = productPrices.reduce(
    (previous, current) => previous + current,
  );

  const shippingCost: number = shippingCosts.reduce(
    (previous, current) => previous + current,
  );

  const totalPrice: number = subTotal + shippingCost;

  const handleRemoveFromCart = (id: string) => {
    // dispatch(removeFromCart(id));
    if (products.length === 0) navigate("/");
  };

  const columns: readonly Column[] = [
    { id: "1", label: "Product", minWidth: 270 },
    { id: "2", label: "Quantity", minWidth: 100 },
    {
      id: "3",
      label: "Price",
      minWidth: 170,
    },
    {
      id: "4",
      label: "Remove",
      minWidth: 170,
    },
  ];

  return (
    <Container sx={{ minHeight: "80vh", py: 5 }}>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {/*============
         products
         =========== */}
        <Grid size={{ md: 8, xs: 12 }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 700 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="left"
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product) => {
                    return (
                      <TableRow hover tabIndex={-1}>
                        {/* product name & img */}
                        <TableCell>
                          <img src={product.img} alt="" />
                          <Typography variant="body1">
                            {product.name}
                          </Typography>
                        </TableCell>
                        {/* product qty & control qty */}
                        <TableCell
                          sx={{
                            // display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mt: "auto",
                            height: "auto",
                          }}
                        >
                          <Box sx={{ display: "flex" }}>
                            <IconButton
                            // onClick={() => dispatch(decreaseQty(product._id))}
                            >
                              <RemoveCircleOutlineIcon />
                            </IconButton>
                            <Typography
                              sx={{
                                border: 1,
                                display: "flex",
                                alignItems: "center",
                                px: 1.2,
                                borderRadius: 1,
                              }}
                              variant="body1"
                            >
                              {product.qty}
                            </Typography>
                            <IconButton
                            // onClick={() => dispatch(increaseQty(product._id))}
                            >
                              <AddCircleOutlineIcon />
                            </IconButton>
                          </Box>
                        </TableCell>
                        {/* product price */}
                        <TableCell>
                          <Typography variant="body1">
                            &#36; {product.totalPrice}
                          </Typography>
                        </TableCell>
                        {/* remove product */}
                        <TableCell>
                          <IconButton
                            onClick={() => handleRemoveFromCart(product._id)}
                          >
                            <CancelOutlinedIcon fontSize="large" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/*===========
          cart
          ================ */}
        <CartMenu
          subTotal={subTotal}
          shippingCost={shippingCost}
          totalPrice={totalPrice}
        />
      </Grid>
    </Container>
  );
};

export default Cart;
