import { USER_ROLE } from "@/constants";
import { selectUser } from "@/redux/features/auth/authSlice";
import {
  addProductToCard,
  selectCartProducts,
} from "@/redux/features/cart/cartSlice";
import {
  addProductToWishlist,
  selectWishlistProducts,
} from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type IProduct from "@/types/product.type";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Product = ({ drone }: { drone: IProduct }) => {
  const { name, description: disc, price, img, _id } = drone;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartProducts = useAppSelector(selectCartProducts);
  const wishlistProducts = useAppSelector(selectWishlistProducts);
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === USER_ROLE.ADMIN;
  const inCart = cartProducts.some((item) => item._id === _id);
  const inWishlist = wishlistProducts.some((item) => item._id === _id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!inCart) {
      dispatch(addProductToCard(drone));
      toast.success("Added to cart!");
    }
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addProductToWishlist(drone));
    toast.success("Added to wishlist!");
  };

  const handleCardClick = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <Grid
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      sx={{
        display: "flex",
        minWidth: 0, // Prevent overflow issues
      }}
    >
      <Card
        onClick={handleCardClick}
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
          transition: (theme) =>
            theme.transitions.create(["transform", "box-shadow"], {
              duration: theme.transitions.duration.shorter,
              easing: theme.transitions.easing.easeInOut,
            }),
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: (theme) =>
              theme.palette.mode === "light"
                ? "0 20px 40px -12px rgba(0,0,0,0.18)"
                : "0 20px 40px -12px rgba(0,0,0,0.3)",
            "& .product-image": {
              transform: "scale(1.05)",
            },
            "& .product-actions": {
              opacity: 1,
              transform: "translateY(0)",
            },
          },
          cursor: "pointer",
          bgcolor: "background.paper",
        }}
      >
        {/* Product Image */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: 180, sm: 200, md: 220 },
            overflow: "hidden",
            background: (theme) =>
              `linear-gradient(135deg, ${alpha(
                theme.palette.primary.light,
                theme.palette.mode === "dark" ? 0.2 : 0.1,
              )} 0%, ${alpha(
                theme.palette.primary.main,
                theme.palette.mode === "dark" ? 0.15 : 0.05,
              )} 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
          }}
        >
          <CardMedia
            component="img"
            className="product-image"
            sx={{
              maxWidth: "80%",
              maxHeight: "80%",
              objectFit: "contain",
              transition: "transform 0.5s ease-in-out",
            }}
            image={img}
            alt={name}
          />

          {/* Overlay Actions */}
          <Box
            className="product-actions"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 1,
              display: "flex",
              justifyContent: "center",
              gap: { xs: 0.5, sm: 1 },
              background: (theme) =>
                `linear-gradient(to top, ${
                  theme.palette.mode === "dark"
                    ? "rgba(0,0,0,0.95)"
                    : "rgba(0,0,0,0.75)"
                } 0%, ${
                  theme.palette.mode === "dark"
                    ? "rgba(0,0,0,0.7)"
                    : "rgba(0,0,0,0.5)"
                } 50%, transparent 100%)`,
              opacity: 0,
              transform: "translateY(20px)",
              transition: (theme) =>
                theme.transitions.create(["opacity", "transform"], {
                  duration: theme.transitions.duration.shorter,
                  easing: theme.transitions.easing.easeInOut,
                }),
            }}
          >
            <Tooltip title={inCart ? "In cart" : "Add to cart"}>
              <IconButton
                size="small"
                onClick={handleAddToCart}
                disabled={inCart || isAdmin}
                sx={{
                  bgcolor: "background.paper",
                  color: inCart ? "primary.main" : "text.primary",
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                  "&.Mui-disabled": {
                    bgcolor: "primary.light",
                    color: "white",
                  },
                }}
              >
                <ShoppingCartIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title={inWishlist ? "In wishlist" : "Add to wishlist"}>
              <IconButton
                size="small"
                onClick={handleAddToWishlist}
                sx={{
                  bgcolor: "background.paper",
                  color: inWishlist ? "secondary.main" : "text.primary",
                  "&:hover": {
                    bgcolor: "secondary.main",
                    color: "white",
                  },
                }}
                disabled={isAdmin}
              >
                {inWishlist ? (
                  <FavoriteIcon fontSize="small" />
                ) : (
                  <FavoriteBorderIcon fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Product Info */}
        <CardContent
          sx={{
            p: 2,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            "&:last-child": {
              pb: 2,
            },
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: 600,
              mb: 1,
              color: "text.primary",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "3.6em",
              lineHeight: "1.2",
            }}
          >
            {name}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "4.5em",
              fontSize: "0.875rem",
              lineHeight: "1.5",
            }}
          >
            {disc}
          </Typography>

          <Box
            sx={{
              mt: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 1,
              width: "100%",
              "& > *": {
                flex: "0 0 auto",
              },
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{
                fontWeight: 700,
                fontSize: "1.25rem",
                lineHeight: 1.2,
                background: (theme) =>
                  `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              ${price.toFixed(2)}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: inCart ? "success.main" : "text.secondary",
                fontWeight: 600,
                fontSize: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                bgcolor: (theme) =>
                  inCart
                    ? alpha(theme.palette.success.main, 0.1)
                    : "transparent",
                px: 1,
                py: 0.5,
                borderRadius: 1,
                whiteSpace: "nowrap",
              }}
            >
              {inCart ? "In Cart" : "Free Shipping"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default Product;
