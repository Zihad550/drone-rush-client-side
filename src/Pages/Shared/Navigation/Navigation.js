import { Apps, DashboardOutlined, Home, Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, ListItem, useTheme } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/logo2.png";

const Navigation = () => {
  const { user, logOut } = useAuth();
  const theme = useTheme();
  const useStyle = makeStyles({
    navIcon: {
      [theme.breakpoints.up("sm")]: {
        display: "none !important",
      },
    },
    navItemContainer: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    navLogo: {
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        justifyContent: "flex-end",
      },
    },
  });
  const { navIcon, navItemContainer, navLogo } = useStyle();
  const [state, setState] = React.useState(false);

  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      <Link style={{ textDecoration: "none", color: "black" }} to="/home">
        <List>
          <ListItem button>Home</ListItem>
        </List>
      </Link>

      <Divider />
      <Link style={{ textDecoration: "none", color: "black" }} to="/explore">
        <List>
          <ListItem button>Explore</ListItem>
        </List>
      </Link>
      <Divider />

      {user.email ? (
        <>
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to="/dashboard"
          >
            <List>
              <ListItem button>Dashboard</ListItem>
            </List>
          </Link>
          <Divider />
          <Button onClick={logOut} color="inherit">
            Log Out
          </Button>
        </>
      ) : (
        <>
          <Link style={{ textDecoration: "none", color: "black" }} to="/login">
            <List>
              <ListItem button>Login</ListItem>
            </List>
          </Link>
          <Divider />
        </>
      )}
    </Box>
  );
  return (
    <>
      <Box sx={{ flexGrow: 1, fontSize: "2rem" }}>
        <AppBar
          sx={{ pb: 1, backgroundColor: "secondary.dark" }}
          position="static"
        >
          <Toolbar>
            {/* mobile menu icon */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              // style={{ display: "none" }}
              className={navIcon}
              onClick={() => setState(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* website logo */}
            <Box
              className={navLogo}
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, textAlign: "left" }}
            >
              <img
                style={{ width: "7rem", height: "5rem" }}
                src={logo}
                alt="logo"
              />
            </Box>
            <Box className={navItemContainer}>
              <Link
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
                to="/home"
              >
                <Button
                  // sx={{ display: "flex", alignItems: "center" }}
                  endIcon={<Home />}
                  color="inherit"
                >
                  Home
                </Button>{" "}
              </Link>

              <Link
                style={{ textDecoration: "none", color: "white" }}
                to="/explore"
              >
                <Button endIcon={<Apps />} color="inherit">
                  Explore
                </Button>{" "}
              </Link>
              {user.email ? (
                <>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to="/dashboard"
                  >
                    <Button endIcon={<DashboardOutlined />} color="inherit">
                      Dashboard
                    </Button>{" "}
                  </Link>
                  <Button endIcon={<Logout />} onClick={logOut} color="inherit">
                    Log Out
                  </Button>
                </>
              ) : (
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/login"
                >
                  <Button color="inherit">Login</Button>
                </Link>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <React.Fragment>
          <Drawer open={state} onClose={() => setState(false)}>
            {list}
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
};

export default Navigation;
