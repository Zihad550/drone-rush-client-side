import { selectCartProducts } from "@/redux/features/cart/cartSlice";
import { useAppSelector } from "@/redux/hooks";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge, { badgeClasses } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const CartLink = () => {
  const products = useAppSelector(selectCartProducts);
  return (
    <IconButton sx={{ ml: 1 }} component={NavLink} to="/user/cart">
      <ShoppingCartIcon sx={{ color: "white" }} fontSize="small" />
      <CartBadge
        badgeContent={products.length}
        color="primary"
        overlap="circular"
      />
    </IconButton>
  );
};

export default CartLink;
