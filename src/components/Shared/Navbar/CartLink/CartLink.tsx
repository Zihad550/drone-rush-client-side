import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { NavLink } from "react-router";
import { useAppSelector } from "@/redux/hooks";
import { selectCartProducts } from "@/redux/features/cart/cartSlice";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

const CartLink = () => {
  const products = useAppSelector(selectCartProducts);
  return (
    <IconButton sx={{ mr: 2 }} component={NavLink} to="/user/cart">
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
