import {
  Add,
  Flight,
  ListAlt,
  Logout,
  PaymentOutlined,
  PersonAdd,
  RateReview,
  ViewList
} from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { ListItemIcon } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const drawerWidth = 200;

function Dashboard() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // get orders
  const {admin } = useAuth();
 
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {admin ? (
        <Box sx={{ flexGrow: 1 }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/dashboard/makeAdmin`}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <PersonAdd />
                </ListItemIcon>
                Make Admin
              </ListItem>
            </List>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/dashboard/addDrone`}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                Add New Drone
              </ListItem>
            </List>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/dashboard/manageDrones`}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <Flight />
                </ListItemIcon>
                Manage All Drones
              </ListItem>
            </List>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/dashboard/manageOrders`}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ListAlt />
                </ListItemIcon>
                Manage All Orders
              </ListItem>
            </List>
          </Link>
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/dashboard/pay`}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <PaymentOutlined />
                </ListItemIcon>
                Pay
              </ListItem>
            </List>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/dashboard/myOrders`}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <ViewList />
                </ListItemIcon>
                My Orders
              </ListItem>
            </List>
          </Link>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/dashboard/review`}
          >
            <List>
              <ListItem button>
                <ListItemIcon>
                  <RateReview />
                </ListItemIcon>
                Review
              </ListItem>
            </List>
          </Link>
        </Box>
      )}
      <Link style={{ textDecoration: "none", color: "black" }} to={`/`}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            Log Out
          </ListItem>
        </List>
      </Link>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { md: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
       <Outlet/>
      </Box>
    </Box>
  );
}


export default Dashboard;
