import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
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
    <Box sx={{ flexGrow: 1, background: "#f2eef5", pb: 2, pt: 6 }}>
      <Container sx={{ width: "100%" }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {/* about & address */}
          <Grid item lg={4} md={6} xs={12} sx={{ textAlign: "left" }}>
            {/* about */}
            <Typography
              sx={{ fontFamily: "'Courgette', cursive" }}
              variant="h5"
            >
              Drone Rush
            </Typography>
            <Typography variant="body1" className="w-50">
              DroneRush.com is the largest drone dealer in the United States and
              we are the largest and most experienced authorized service center
              in the United States.
            </Typography>
            {/* address */}
            <Address />
          </Grid>

          {/* quick links */}
          <Grid item lg={2.33} md={6} sm={6} xs={12} sx={{ textAlign: "left" }}>
            <FooterNav navs={quickNavs} subtitle="Company" />
          </Grid>

          {/* account links */}
          <Grid item lg={2.33} md={6} sm={6} xs={12} sx={{ textAlign: "left" }}>
            <FooterNav navs={accountNavs} title="Account" />
          </Grid>

          {/* corporate links */}
          <Grid item lg={2.33} md={6} sm={6} xs={12} sx={{ textAlign: "left" }}>
            <FooterNav navs={corporateNavs} title="Corporate" />
          </Grid>

          {/* copyright */}
          <Grid item md={12} xs={12} sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ testAlign: "center" }}>
              &copy; 2022 Drone Rush. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
