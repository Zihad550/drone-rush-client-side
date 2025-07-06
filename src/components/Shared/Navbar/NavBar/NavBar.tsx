import Logo from "@/components/Shared/Logo/Logo";
import { USER_ROLE } from "@/constants";
import {
  logout,
  selectToken,
  type IUser,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { publicPaths } from "@/routes/public.routes";
import { userPaths } from "@/routes/user.routes";
import type { INavItem } from "@/types";
import { navItemGenerator } from "@/utils/navItemGenerator";
import { verifyToken } from "@/utils/verifyToken";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button, Container, Divider, ListItemButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { NavLink } from "react-router";
import CartLink from "../CartLink/CartLink";
import UserMenu from "../UserMenu/UserMenu";

const drawerWidth = 200;

function NavBar() {
  const token = useAppSelector(selectToken);
  const dispatch = useAppDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let user;
  if (token) {
    try {
      user = verifyToken(token) as IUser;
    } catch {
      dispatch(logout());
    }
  }

  const pages: INavItem[] = navItemGenerator({ paths: publicPaths });
  if (user && user.role === USER_ROLE.USER) {
    pages.push(...navItemGenerator({ paths: userPaths, role: user.role }));
  }

  const socialItems = (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        gap: 1,
        justifyContent: "center",
      }}
    >
      <IconButton
        sx={{
          color: "#3b82f6",
          bgcolor: "white",
          mx: 0.5,
          "&:hover": { bgcolor: "#e0f2fe" },
        }}
      >
        <FacebookRoundedIcon />
      </IconButton>
      <IconButton
        sx={{
          color: "#06b6d4",
          bgcolor: "white",
          mx: 0.5,
          "&:hover": { bgcolor: "#e0f2fe" },
        }}
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        sx={{
          color: "#e1306c",
          bgcolor: "white",
          mx: 0.5,
          "&:hover": { bgcolor: "#fce7f3" },
        }}
      >
        <InstagramIcon />
      </IconButton>
      <IconButton
        sx={{
          color: "#e60023",
          bgcolor: "white",
          mx: 0.5,
          "&:hover": { bgcolor: "#fee2e2" },
        }}
      >
        <PinterestIcon />
      </IconButton>
    </Box>
  );

  const drawer = (
    <Box sx={{ p: 2 }}>
      <List>
        {pages.map((page) => (
          <ListItemButton
            component={NavLink}
            key={page.key}
            to={page.path}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 16,
              mb: 0.5,
              "&.active, &:hover": {
                background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
                color: "white",
              },
            }}
          >
            {page.key}
          </ListItemButton>
        ))}
      </List>
      <Divider sx={{ my: 2 }} />
      {/* social  */}
      {socialItems}
    </Box>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="sticky"
          color="secondary"
          elevation={0}
          sx={{
            bgcolor: "rgba(15, 23, 42, 0.75)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px 0 rgba(15, 23, 42, 0.15)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            top: 0,
            left: 0,
            borderRadius: 0,
            m: 0,
            p: 0,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                padding: "0 !important",
                minHeight: 64,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", width: "100%" }}
              >
                {/* Logo and Mobile Menu Button */}
                <Box
                  sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}
                >
                  <Logo sx={{ display: { xs: "none", sm: "flex" }, mr: 2 }} />
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleMobileMenuToggle}
                    sx={{ display: { sm: "none" }, mr: 1 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Logo sx={{ display: { xs: "flex", sm: "none" }, mr: 2 }} />
                </Box>

                {/* Desktop Navigation Links */}
                <Box
                  sx={{
                    display: { sm: "flex", xs: "none" },
                    flexGrow: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    gap: { sm: 1, md: 4 },
                    ml: { sm: 0, md: 2 },
                  }}
                >
                  {pages.map((page) => (
                    <Button
                      component={NavLink}
                      to={page.path}
                      key={page.key}
                      sx={{
                        sm: {
                          fontSize: 12,
                          px: 1.5,
                          py: 0.5,
                        },
                        md: {
                          fontSize: 17,
                          px: 2.5,
                          py: 1,
                        },
                        color: "white",
                        fontWeight: "600",
                        display: "block",
                        borderRadius: 2,
                        position: "relative",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        width: "max-content",
                        "&:hover": {
                          boxShadow: "0 8px 25px -5px rgba(59, 130, 246, 0.4)",
                          transform: "translateY(-2px)",
                          "&::before": {
                            opacity: 1,
                          },
                        },
                        "&.active": {
                          background:
                            "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
                          color: "white",
                          boxShadow: "0 8px 25px -5px rgba(59, 130, 246, 0.5)",
                        },
                      }}
                      variant="text"
                    >
                      {page.key}
                    </Button>
                  ))}
                </Box>
              </Box>
              {/*====================
               features
               ================== */}

              <Box sx={{ display: { xs: "flex" } }}>
                {user ? (
                  <>
                    {user?.role !== USER_ROLE.ADMIN && <CartLink />}
                    <UserMenu />
                  </>
                ) : (
                  <Button
                    sx={{
                      color: "white",
                      fontSize: 17,
                      fontWeight: "600",
                      display: "block",
                      mx: 3,
                      px: 3,
                      py: 0.8,
                      borderRadius: 2,
                      background: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.25)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                    component={NavLink}
                    to="/login"
                  >
                    Login
                  </Button>
                )}
              </Box>
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
                background: "rgba(15, 23, 42, 0.9)",
                backdropFilter: "blur(10px)",
                borderRight: "1px solid rgba(255, 255, 255, 0.08)",
                color: "white",
                boxShadow: "0 8px 32px 0 rgba(15, 23, 42, 0.3)",
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
