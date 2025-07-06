import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import { Link as RouterLink } from "react-router";

const LogoContainer = styled(RouterLink)(() => ({
  display: "flex",
  alignItems: "center",
  textDecoration: "none",
  "&:hover": {
    "& .drone-icon": {
      transform: "translateY(-3px)",
    },
  },
}));

const DroneIcon = styled(Box)(() => ({
  width: 36,
  height: 36,
  marginRight: 8,
  position: "relative",
  transition: "transform 0.3s ease",
  "&::before, &::after": {
    content: '""',
    position: "absolute",
    backgroundColor: "#3b82f6",
    borderRadius: "50%",
  },
  "&::before": {
    width: "100%",
    height: "100%",
    opacity: 0.2,
    animation: "pulse 2s infinite",
  },
  "&::after": {
    width: "60%",
    height: "60%",
    top: "20%",
    left: "20%",
    backgroundColor: "#3b82f6",
    boxShadow: "0 0 15px rgba(59, 130, 246, 0.6)",
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
      opacity: 0.2,
    },
    "50%": {
      transform: "scale(1.2)",
      opacity: 0.1,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 0.2,
    },
  },
}));

const LogoText = styled(Typography)(() => ({
  fontWeight: 800,
  background: "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  letterSpacing: "0.5px",
  fontSize: "1.5rem",
  /* [theme.breakpoints.down('sm')]: {
    fontSize: '1.25rem',
  }, */
}));

interface LogoProps {
  sx?: SxProps<Theme>;
}

const Logo = ({ sx = {} }: LogoProps) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }}>
      <LogoContainer
        to="/"
        sx={{ display: "flex", alignItems: "center", textDecoration: "none" }}
      >
        <DroneIcon className="drone-icon" />
        <LogoText
          variant="h5"
          sx={{
            m: 0,
            ml: 1,
            lineHeight: 1,
            display: { md: "inline-block", sm: "none", xs: "inline-block" },
          }}
        >
          DroneRush
        </LogoText>
        <LogoText
          variant="h5"
          sx={{
            m: 0,
            ml: 1,
            lineHeight: 1,
            display: { xs: "none", sm: "inline-block", md: "none" },
          }}
        >
          DR
        </LogoText>
      </LogoContainer>
    </Box>
  );
};

export default Logo;
