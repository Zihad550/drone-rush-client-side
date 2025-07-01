import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Button } from "@mui/material";
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
// import { useNavigate } from "react-router";

const TopBar = () => {
  const user = useAppSelector(selectUser);
  const [anchorElUser, setAnchorElUser] = useState<any>(null);
  // const cart = useSelector((state: AppState) => state.cart);
  // const wishlist = useSelector((state: AppState) => state.wishlist);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const settings = [
    {
      id: 1,
      name: "Profile",
      link: "",
    },
    {
      id: 2,
      name: "Dashboard",
      link: "/dashboard",
    },
  ];
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    // dispatch(logout());
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
            {user?.id ? (
              <>
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
                      <Button
                        sx={{ color: "black" }}
                        variant="text"
                        // onClick={() => navigate(setting.link)}
                      >
                        {setting.name}
                      </Button>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    <Button
                      onClick={handleLogout}
                      sx={{ color: "black" }}
                      variant="text"
                    >
                      Log Out
                    </Button>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                // onClick={() => navigate("/login")}
                color="secondary"
              >
                Log In
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopBar;
