import DashboardDrawer from "@/components/Shared/DashboardDrawer";
import DashboardHeader from "@/components/Shared/DashboardHeader";
import { USER_ROLE } from "@/constants";
import { selectToken, type IUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminPaths } from "@/routes/admin.routes";
import { userDashboardPaths } from "@/routes/user.routes";
import type { INavItem } from "@/types";
import { navItemGenerator } from "@/utils/navItemGenerator";
import { verifyToken } from "@/utils/verifyToken";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  minHeight: 64,
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))"
      : "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
  color: "white",
  boxShadow:
    "0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 0, 0, 0.2)",
  marginBottom: "8px",
  "& .MuiTypography-root": {
    fontWeight: 600,
    fontSize: "1.1rem",
    letterSpacing: "0.5px",
  },
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: "none",
  color:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(0, 0, 0, 0.7)",
  display: "block",
  borderRadius: "8px",
  margin: "4px 8px",
  transition: "all 0.2s ease-in-out",
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
  "&.active": {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    "& .MuiListItemIcon-root": {
      color: theme.palette.primary.main,
    },
  },
}));

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  minHeight: "100vh",
  backgroundImage:
    theme.palette.mode === "dark"
      ? "radial-gradient(circle at 50% 50%, rgba(30, 30, 40, 0.8) 0%, rgba(15, 15, 25, 0.9) 100%)"
      : "radial-gradient(circle at 50% 50%, rgba(240, 245, 250, 0.8) 0%, rgba(230, 235, 240, 0.9) 100%)",
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
}));

const Dashboard = () => {
  const token = useAppSelector(selectToken);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let user;
  if (token) {
    user = verifyToken(token) as IUser;
  }

  let pages: INavItem[] = [];

  switch (user?.role) {
    case USER_ROLE.ADMIN:
      pages = navItemGenerator({
        paths: adminPaths,
        extraPath: "dashboard",
        role: USER_ROLE.ADMIN,
      });
      break;
    case USER_ROLE.USER:
      pages = navItemGenerator({
        paths: userDashboardPaths,
        role: USER_ROLE.USER,
        extraPath: "dashboard",
      });
      break;
  }

  const location = useLocation();
  const pageTitle =
    pages.find((page) => page.path === location.pathname)?.key || "Dashboard";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <DashboardHeader position="fixed" open={open}>
        <Toolbar
          sx={{
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))"
                : "linear-gradient(195deg, rgb(73, 163, 241), rgb(26, 115, 232))",
            color: "white",
            boxShadow:
              "0 4px 20px 0 rgba(0, 0, 0, 0.14), 0 7px 10px -5px rgba(0, 0, 0, 0.2)",
            paddingLeft: { sm: "24px" },
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && { display: "none" }),
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {pageTitle}
          </Typography>
        </Toolbar>
      </DashboardHeader>

      <DashboardDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 1, fontWeight: 600 }}>
            {open ? "Menu" : "DR"}
          </Typography>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: "white",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.1)" }} />

        <List sx={{ p: 1 }}>
          {pages.map((page) => (
            <ListItem key={page.key} disablePadding sx={{ display: "block" }}>
              <StyledNavLink to={page.path}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "flex-start" : "center",
                    px: 2.5,
                    borderRadius: "8px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    {page.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={page.key}
                    primaryTypographyProps={{
                      fontWeight: "medium",
                      fontSize: "0.9rem",
                    }}
                    sx={{
                      opacity: open ? 1 : 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  />
                </ListItemButton>
              </StyledNavLink>
            </ListItem>
          ))}
        </List>

        <Box sx={{ mt: "auto", p: 2 }}>
          <Divider sx={{ my: 2, borderColor: "rgba(255, 255, 255, 0.1)" }} />
          <StyledNavLink to="/">
            <ListItemButton
              onClick={() => navigate("/")}
              sx={{
                minHeight: 48,
                justifyContent: open ? "flex-start" : "center",
                px: 2.5,
                borderRadius: "8px",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                  color: "inherit",
                }}
              >
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText
                primary="Back to Home"
                primaryTypographyProps={{
                  fontWeight: "medium",
                  fontSize: "0.9rem",
                }}
                sx={{
                  opacity: open ? 1 : 0,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              />
            </ListItemButton>
          </StyledNavLink>
        </Box>
      </DashboardDrawer>

      <MainContent>
        <Toolbar />
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: theme.shadows[2],
            p: 3,
            minHeight: "calc(100vh - 120px)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.primary.main, 0)} 100%)`,
              pointerEvents: "none",
            },
          }}
        >
          <Outlet />
        </Box>
      </MainContent>
    </Box>
  );
};

export default Dashboard;
