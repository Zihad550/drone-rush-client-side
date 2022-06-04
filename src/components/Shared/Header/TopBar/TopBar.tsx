import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/store";

const TopBar = () => {
  const { data: user } = useSelector((state: AppState) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState<any>(null);
  const dispatch = useDispatch();
  const settings = [
    {
      id: 1,
      name: "Profile",
      link: "",
    },
    {
      id: 2,
      name: "Dashboard",
      link: "",
    },
  ];
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
    console.log(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }} position="static">
      <Container
        maxWidth="xl"
        sx={{
          background: "#f1f1f1",
          height: { sm: "50px" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Toolbar disableGutters sx={{ height: { sm: "50px" } }}>
          {/*===================
           desktop contents
           =================== */}
          <Box
            sx={{
              display: { sm: "flex", xs: "none" },
              width: "100%",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                mr: 2,
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
              }}
            >
              Mobile: +008 1234567891
            </Typography>
            {/* social  */}
            <Box
              sx={{
                borderLeft: "2px solid gray",
                display: { xs: "none", sm: "block" },
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
          </Box>

          {/* ==================
          mobile contents
          ===================== */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", sm: "none" },
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body1">Mobile: +008 1234567891</Typography>
          </Box>

          {/* ================
          desktop content
          ================= */}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: { sm: 1 }, py: { sm: 1.5 } }}
              >
                <Avatar alt="User" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id}>
                  <Typography variant="body2" textAlign="center">
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
              {user?.email ? (
                <MenuItem>
                  <Typography variant="body2">Log Out</Typography>
                </MenuItem>
              ) : (
                <MenuItem>
                  <Typography variant="body2">Log Out</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
