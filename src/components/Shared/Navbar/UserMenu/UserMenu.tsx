import { USER_ROLE } from "@/constants";
import { logout, selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Avatar, IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
        }}
      >
        {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
        {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
        {user?.role === "admin" ? (
          <MenuItem component={NavLink} to="/admin/dashboard">
            Dashboard
          </MenuItem>
        ) : (
          <MenuItem component={NavLink} to="/user/dashboard">
            Dashboard
          </MenuItem>
        )}
        {user?.role !== USER_ROLE.ADMIN && (
          <MenuItem component={NavLink} to="/user/wishlist">
            Wishlist
          </MenuItem>
        )}
        <MenuItem onClick={() => dispatch(logout())}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
