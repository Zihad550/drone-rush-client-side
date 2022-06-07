import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "redux/store";
import IProduct from "types/ProductType";

const MiddleBar = () => {
  const navigate = useNavigate();
  const cartProducts = useSelector((state: AppState) => state.cart);
  const wishlistProducts = useSelector((state: AppState) => state.wishlist);

  const handleNavigate = ({
    link,
    products,
  }: {
    link: string;
    products: IProduct[];
  }) => {
    if (!products.length) {
      alert("You don't have any products");
      return;
    }
    navigate(link);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: { xs: "none", sm: "flex" },
        justifyContent: "space-between",
        my: 1,
        alignItems: "center",
      }}
    >
      {/* website logo */}
      <Typography variant="h5">Drone Rush</Typography>
      {/* search area */}
      <Box>
        <TextField
          // size="small"
          variant="outlined"
          placeholder="Search Products"
        />
        <Button
          size="large"
          variant="contained"
          sx={{ py: 2, pl: 4 }}
          startIcon={<SearchIcon />}
        />
      </Box>

      {/* features */}
      <Box sx={{ display: "flex" }}>
        {/* <Box className="primary-hover-effect">
          <IconButton className="primary-hover-effect">
            <ScaleOutlinedIcon sx={{ color: "black" }} fontSize="large" />
          </IconButton>
          <Typography variant="body2">Compare</Typography>
        </Box>
         */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="primary-hover-effect"
          onClick={() =>
            handleNavigate({ link: "/wishlist", products: wishlistProducts })
          }
        >
          <IconButton className="primary-hover-effect">
            <Badge badgeContent={wishlistProducts.length} color="primary">
              <FavoriteBorderIcon sx={{ color: "black" }} fontSize="large" />
            </Badge>
          </IconButton>
          <Typography variant="body2">Wishlist</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="primary-hover-effect"
          onClick={() =>
            handleNavigate({ link: "/cart", products: cartProducts })
          }
        >
          <IconButton className="primary-hover-effect">
            <Badge badgeContent={cartProducts.length} color="secondary">
              <ShoppingCartOutlinedIcon
                sx={{ color: "black" }}
                fontSize="large"
              />
            </Badge>
          </IconButton>
          <Typography variant="body2">Cart</Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default MiddleBar;
