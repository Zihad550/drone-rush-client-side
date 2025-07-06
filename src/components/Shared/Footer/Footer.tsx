import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router";
import Address from "./Address";
import FooterNav from "./FooterNav";

const Footer = () => {
  // quick navs
  const quickNavs = [
    {
      id: 1,
      name: "About Us",
      link: "",
    },
    {
      id: 2,
      name: "Explore",
      link: "",
    },
    {
      id: 3,
      name: "Privacy Policy",
      link: "",
    },
    {
      id: 4,
      name: "Terms & Conditions",
      link: "",
    },
    {
      id: 5,
      name: "Contact Us",
      link: "",
    },
    {
      id: 6,
      name: "Support Center",
      link: "",
    },
    {
      id: 7,
      name: "Careers",
      link: "",
    },
  ];

  // account info related navs
  const accountNavs = [
    {
      id: 1,
      name: "Sign In",
      link: "",
    },
    {
      id: 2,
      name: "View Cart",
      link: "",
    },
    {
      id: 3,
      name: "My Wishlist",
      link: "",
    },
    {
      id: 4,
      name: "Track My Order",
      link: "",
    },
    {
      id: 5,
      name: "Shipping Details",
      link: "",
    },
    {
      id: 6,
      name: "Compare Products",
      link: "",
    },
  ];

  // corporate related navs
  const corporateNavs = [
    {
      id: 1,
      name: "Become a Vendor",
      link: "",
    },
    {
      id: 2,
      name: "Our Suppliers",
      link: "",
    },
    {
      id: 3,
      name: "Accessibility",
      link: "",
    },
    {
      id: 4,
      name: "Promotions",
      link: "",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        width: "100%",
        bgcolor: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(10px)",
        color: "grey.100",
        pt: 6,
        pb: 0,
        mt: 8,
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 -10px 40px rgba(0, 0, 0, 0.2)",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at top right, rgba(59, 130, 246, 0.1), transparent 70%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 2 }}>
          {/* About & Address */}
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Typography
              sx={{
                fontFamily: "'Courgette', cursive",
                color: "primary.light",
                mb: 1,
              }}
              variant="h5"
            >
              Drone Rush
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: "grey.300" }}>
              DroneRush.com is the largest drone dealer in the United States and
              the most experienced authorized service center in the US.
            </Typography>
            <Address />
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton
                component="a"
                href="#"
                sx={{
                  color: "#3b82f6",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 16px rgba(59, 130, 246, 0.3)",
                  },
                }}
              >
                <FacebookRoundedIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                sx={{
                  color: "#06b6d4",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 16px rgba(6, 182, 212, 0.3)",
                  },
                }}
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                sx={{
                  color: "#e1306c",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 16px rgba(225, 48, 108, 0.3)",
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="#"
                sx={{
                  color: "#e60023",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(5px)",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    background: "rgba(255, 255, 255, 0.2)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 8px 16px rgba(230, 0, 35, 0.3)",
                  },
                }}
              >
                <PinterestIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 2 }}>
            <FooterNav navs={quickNavs} subtitle="Company" />
          </Grid>

          {/* Account Links */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 2 }}>
            <FooterNav navs={accountNavs} title="Account" />
          </Grid>

          {/* Corporate Links */}
          <Grid size={{ xs: 12, sm: 6, md: 6, lg: 2 }}>
            <FooterNav navs={corporateNavs} title="Corporate" />
          </Grid>

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 6, lg: 2 }}>
            <Typography variant="h6" sx={{ mb: 1, color: "primary.light" }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ color: "grey.400", mb: 1 }}>
              Subscribe to get the latest drone news and deals!
            </Typography>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                mt: 2,
              }}
            >
              <Stack
                direction={{ xs: "column", sm: "row", lg: "column" }}
                spacing={1}
                component="form"
                onSubmit={(e) => e.preventDefault()}
                sx={{ width: "100%" }}
              >
                <TextField
                  size="small"
                  placeholder="Your email"
                  variant="outlined"
                  sx={{
                    borderRadius: 2,
                    input: { color: "grey.100" },
                    flex: 1,
                    width: { xs: "100%", sm: "auto" },
                    "& .MuiOutlinedInput-root": {
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(5px)",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                      "&:hover": {
                        borderColor: "rgba(255, 255, 255, 0.2)",
                      },
                      "&.Mui-focused": {
                        borderColor: "primary.main",
                      },
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    fontWeight: 600,
                    width: { xs: "100%", sm: "auto" },
                    mt: { xs: 1, sm: 0 },
                    background:
                      "linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)",
                    boxShadow: "0 4px 12px rgba(59, 130, 246, 0.4)",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(59, 130, 246, 0.6)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Subscribe
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>
        <Box
          sx={{
            borderTop: "1px solid #222",
            mt: 5,
            pt: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="body2" sx={{ color: "grey.500" }}>
            &copy; {new Date().getFullYear()} Drone Rush. All rights reserved.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            sx={{ mt: 1 }}
          >
            <MuiLink
              component={RouterLink}
              to="/privacy"
              color="grey.100"
              underline="hover"
              sx={{ fontSize: 13, "&:hover": { color: "primary.light" } }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={RouterLink}
              to="/terms"
              color="grey.100"
              underline="hover"
              sx={{ fontSize: 13, "&:hover": { color: "primary.light" } }}
            >
              Terms & Conditions
            </MuiLink>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
