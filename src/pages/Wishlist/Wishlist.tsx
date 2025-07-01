import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Button, Container, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Spinner from "@/components/Shared/Spinner";
import { useNavigate } from "react-router";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const Wishlist = () => {
  // cart data
  // const products = useSelector((state: AppState) => state.wishlist);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = [];

  if (!products.length) {
    navigate("/");
    return <Spinner />;
  }

  const handleRemoveFromCart = (id: string) => {
    // dispatch(removeFromCart(id));
    if (products.length === 0) navigate("/");
  };

  const columns: readonly Column[] = [
    {
      id: "4",
      label: "",
      minWidth: 30,
    },
    { id: "1", label: "Product", minWidth: 270 },
    {
      id: "3",
      label: "Price",
      minWidth: 170,
    },
    {
      id: "4",
      label: "",
      minWidth: 50,
    },
  ];

  return (
    <Container sx={{ minHeight: "80vh", py: 5 }}>
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
                    {column?.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id} hover tabIndex={-1}>
                  {/* remove product */}
                  <TableCell>
                    <IconButton
                      onClick={() => handleRemoveFromCart(product._id)}
                    >
                      <CancelOutlinedIcon fontSize="large" />
                    </IconButton>
                  </TableCell>
                  {/* product name & img */}
                  <TableCell>
                    <img src={product.img} alt="" />
                    <Typography variant="body1">{product.name}</Typography>
                  </TableCell>

                  {/* product price */}
                  <TableCell>
                    <Typography variant="body1">
                      &#36; {product.price}
                    </Typography>
                  </TableCell>
                  {/* Add to wishlist */}
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        // dispatch(addToCart(product));
                        // dispatch(removeFromWishlist(product._id));
                      }}
                    >
                      Add To Cart
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Wishlist;
