import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import notFoundImage from "../../../images/404.jpg";

const NotFound = () => {
  const notFoundBg = {
    background: `url(${notFoundImage})`,
    width: "100%",
    height: "100vh",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };
  return (
    <Box
      style={notFoundBg}
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h1"
        sx={{ mb: 2, fontWeight: 500, color: "error.main", letterSpacing: 5 }}
      >
        ERROR 404
      </Typography>
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: 500,
          color: "primary.main",
          letterSpacing: 5,
          wordSpacing: 5,
        }}
      >
        PAGE NOT FOUND
      </Typography>
      <Link style={{ textDecoration: "none" }} to="/home">
        <Button variant="contained" color="secondary">
          Back to Homepage
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;
