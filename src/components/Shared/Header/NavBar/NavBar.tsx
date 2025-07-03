import { logout, selectToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { publicPaths } from "@/routes/public.routes";
import type { INavItem } from "@/types";
import { navItemGenerator } from "@/utils/navItemGenerator";
import { verifyToken } from "@/utils/verifyToken";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import PinterestIcon from "@mui/icons-material/Pinterest";
import ScaleOutlinedIcon from "@mui/icons-material/ScaleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Button,
  Container,
  Divider,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import UserMenu from "../UserMenu/UserMenu";

const drawerWidth = 200;

function NavBar() {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navigate = useNavigate();

  let user;
  if (token) {
    try {
      user = verifyToken(token);
    } catch (err) {
      dispatch(logout());
    }
  }

  const pages: INavItem[] = navItemGenerator(publicPaths);

  const drawer = (
    <div>
      <Box sx={{ p: 1, display: "flex" }}>
        <TextField size="small" placeholder="Search products" />
        <Button variant="contained" endIcon={<SearchIcon />} />
      </Box>

      <Divider />
      <List>
        {pages.map((page) => (
          <ListItemButton component={NavLink} key={page.key} to={page.path}>
            {page.key}
          </ListItemButton>
        ))}
      </List>

      <Divider />
      {/* social  */}
      <Box
        sx={{
          display: { xs: "block", sm: "none" },
        }}
      >
        <IconButton>
          <FacebookRoundedIcon />
        </IconButton>
        <IconButton>
          <TwitterIcon />
        </IconButton>
        <IconButton>
          <InstagramIcon />
        </IconButton>
        <IconButton>
          <PinterestIcon />
        </IconButton>
      </Box>
    </div>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar position="relative" color="secondary">
          <Container maxWidth="xl">
            <Toolbar sx={{ padding: "0 !important" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleMobileMenuToggle}
                sx={{ display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              {/* ===============
              desktop main links
              =================== */}
              <Box
                sx={{
                  display: { sm: "flex", xs: "none" },
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {pages.map((page) => (
                  <Button
                    component={NavLink}
                    to={page.path}
                    key={page.key}
                    sx={{
                      color: "white",
                      fontSize: 17,
                      fontWeight: "600",
                      display: "block",
                      mx: 3,
                    }}
                  >
                    {page.key}
                  </Button>
                ))}
              </Box>
              {/*====================
               features
               ================== */}
              <Box sx={{ display: { xs: "flex", sm: "none" }, ml: "auto" }}>
                <Typography variant="h5" sx={{ mr: 3 }}>
                  Drone Rush
                </Typography>
                <Box className="primary-hover-effect">
                  <IconButton className="primary-hover-effect">
                    <ScaleOutlinedIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
                <Box sx={{ mx: 3 }} className="primary-hover-effect">
                  <IconButton className="primary-hover-effect">
                    <FavoriteBorderIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  className="primary-hover-effect"
                  onClick={() => navigate("/cart")}
                >
                  <IconButton className="primary-hover-effect">
                    <ShoppingCartOutlinedIcon sx={{ color: "white" }} />
                  </IconButton>
                </Box>
              </Box>
              {user ? (
                <UserMenu />
              ) : (
                <Button
                  sx={{
                    color: "white",
                    fontSize: 17,
                    fontWeight: "600",
                    display: "block",
                    mx: 3,
                  }}
                  component={NavLink}
                  to="/login"
                >
                  Login
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
        <Box aria-label="navigation items">
          <Drawer
            open={mobileOpen}
            onClose={handleMobileMenuToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}

export default NavBar;
