import {
  Add,
  Flight, ListAlt,
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
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import AdminRoute from "../../Login/AdminRoute/AdminRoute";
import AddDrone from "../AddDrone/AddDrone";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import ManageAllOrders from "../ManageAllOrders/ManageAllOrders";
import ManageDrones from "../ManageDrones/ManageDrones";
import MyOrders from "../MyOrders/MyOrders";
import Pay from "../Pay/Pay";
import Review from "../Review/Review";

const drawerWidth = 200;

function Dashboard(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let { path, url } = useRouteMatch();

  // get orders
  const { user, token } = useAuth();
  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    fetch(
      `https://still-castle-43681.herokuapp.com/orders/myOrders?email=${user.email}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => setMyOrders(data));
  }, [user.email]);

  const { admin, logOut } = useAuth();

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
            to={`${url}/makeAdmin`}
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
            to={`${url}/addDrone`}
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
            to={`${url}/manageDrones`}
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
            to={`${url}/manageOrders`}
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
            to={`${url}/pay`}
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
            to={`${url}/myOrders`}
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
            to={`${url}/review`}
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
      <Link style={{textDecoration: "none", color: "black"}} to={`/`}>
      <List>
        <ListItem  button>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          Log Out
        </ListItem>
      </List>
      </Link>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
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
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
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
            display: { xs: "none", sm: "block" },
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
        <Switch>
          <Route exact path={path}></Route>
          <AdminRoute path={`${path}/makeAdmin`}>
            <MakeAdmin />
          </AdminRoute>
          <AdminRoute path={`${path}/addDrone`}>
            <AddDrone />
          </AdminRoute>
          <AdminRoute path={`${path}/manageDrones`}>
            <ManageDrones />
          </AdminRoute>
          <AdminRoute path={`${path}/manageOrders`}>
            <ManageAllOrders />
          </AdminRoute>
          <Route path={`${path}/pay`}>
            <Pay />
          </Route>
          <Route path={`${path}/myOrders`}>
            <MyOrders myOrders={myOrders} />
          </Route>

          <Route path={`${path}/review`}>
            <Review myOrders={myOrders} />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
