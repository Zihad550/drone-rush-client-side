import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { Divider, Drawer, ListItem, Typography, useTheme } from "@mui/material";
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
import "./Navigation.css";

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
  ///////////////////////////////
  // mobile menu
  ///////////////////////////
  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      <Link style={{ textDecoration: "none", color: "black" }} to="/home">
        <List>
          <ListItem button>Home</ListItem>
        </List>
      </Link>
      <Link style={{ textDecoration: "none", color: "black" }} to="/contactUs">
        <List>
          <ListItem button>Contact Us</ListItem>
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
          sx={{ backgroundColor: "transparent", color: "black" }}
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

            {/* =================
            large screen menu
            =================== */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
              className={navItemContainer}
            >
              {/* left nav container */}
              <Box>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/home"
                >
                  <Button
                    // sx={{ display: "flex", alignItems: "center" }}
                    className="nav-item"
                  >
                    Home
                  </Button>{" "}
                </Link>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/contactUs"
                >
                  <Button
                    // sx={{ display: "flex", alignItems: "center" }}
                    className="nav-item"
                  >
                    Contact Us
                  </Button>{" "}
                </Link>
              </Box>
              {/* website logo */}
              <Box
                className={navLogo}
                variant="h5"
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <img
                  style={{ width: "3rem", height: "3rem" }}
                  src={logo}
                  alt="logo"
                />
                <Typography
                  sx={{
                    display: "inline-block",
                    fontSize: "1.5rem",
                    border: 0,
                  }}
                  variant="h1"
                >
                  Drone Rush
                </Typography>
              </Box>

              {/* right nav container */}
              <Box>
                <Link style={{ textDecoration: "none" }} to="/explore">
                  <Button className="nav-item">Explore</Button>{" "}
                </Link>
                {user.email ? (
                  <>
                    <Link style={{ textDecoration: "none" }} to="/dashboard">
                      <Button className="nav-item">Dashboard</Button>{" "}
                    </Link>
                    <Button
                      className="nav-item"
                      endIcon={<Logout className="nav-icon" />}
                      onClick={logOut}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <Link style={{ textDecoration: "none" }} to="/login">
                    <Button className="nav-item" color="inherit">
                      Login
                    </Button>
                  </Link>
                )}
              </Box>
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
