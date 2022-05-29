import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Divider,
  Drawer,
  Grid,
  ListItem,
  Theme,
  Typography,
} from "@mui/material";
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
import logo2 from "../../../images/logo2.png";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useAuth();
  const useStyle = makeStyles((theme: Theme) => ({
    navIcon: {
      [theme.breakpoints.up("md")]: {},
    },
    navItemContainer: {
      [theme.breakpoints.down("md")]: {
        display: "none !important",
      },
    },
    navLogo: {
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "flex-end",
      },
    },
  }));
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
          sx={{
            backgroundColor: "secondary.main",
            color: "black",
            py: 0.5,
            boxShadow: 0,
          }}
          position="static"
        >
          <Toolbar>
            {/* mobile menu icon */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, display: { md: "none", xs: "inline-block" } }}
              onClick={() => setState(true)}
            >
              <MenuIcon />
            </IconButton>

            {/* =================
            large screen menu
            =================== */}
            <Grid
              container
              sx={{
                width: "100%",
                display: { xs: "none", md: "flex" },
              }}
            >
              {/* left nav container */}
              <Grid md={4} item sx={{ textAlign: "right" }}>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/home"
                >
                  <Button className="nav-item">Home</Button>{" "}
                </Link>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                  to="/contactUs"
                >
                  <Button className="nav-item">Contact Us</Button>{" "}
                </Link>
              </Grid>
              {/* website logo */}
              <Grid
                md={4}
                item
                component="div"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: { md: "center", xs: "flex-end" },
                }}
              >
                <img
                  style={{
                    width: "3rem",
                    height: "3rem",
                    display: "inline-block",
                  }}
                  src={logo2}
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
              </Grid>

              {/* right nav container */}
              <Grid md={4} item>
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
              </Grid>
            </Grid>

            {/* website mobile menu logo */}
            <Box
              component="div"
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "center",
                ms: "auto",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <img
                style={{ width: "3rem", height: "3rem" }}
                src={logo2}
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

export default Header;
