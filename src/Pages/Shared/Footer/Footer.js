import { Container, Grid, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";

const Footer = () => {
  const theme = useTheme();
  const useStyle = makeStyles({
    footerDiv: {
      [theme.breakpoints.down("sm")]: {
        margin: "0 auto",
      },
    },
    mobileFooterHeading: {
      [theme.breakpoints.down("sm")]: {
        margin: "auto !important",
      },
    },
  });
  const { footerDiv, mobileFooterHeading } = useStyle();
  return (
    <Box sx={{ flexGrow: 1, background: "#1B1F23", color: "white", pb: 2 }}>
      <Container sx={{ width: "100%" }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item md={6} xs={12} sx={{ textAlign: "left" }}>
            <h2>Drone Rush</h2>
            <p className="w-50">
              DroneRush.com is the largest drone dealer in the United States and
              we are the largest and most experienced authorized service center
              in the United States.
            </p>
          </Grid>

          {/* quick links */}
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              textAlign: "left",
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <Typography
              className={mobileFooterHeading}
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
              Quick Links
            </Typography>

            <ul className={footerDiv} style={{ listStyle: "none" }}>
              <li>ABOUT US</li>
              <li>ALL PRODUCTS</li>
              <li>SHIPPING & RETURNS</li>
              <li>DELIVERY INFORMATION</li>
              <li>PRIVACY POLICY</li>
              <li>SPLASH DRONE FAQ</li>
              <li>BECOME A DEALER</li>
              <li>DRONE INSURANCE</li>
              <li>FAA DRONE REGISTRATION</li>
            </ul>
          </Grid>
          {/* quick links */}
          <Grid item md={12} xs={12}>
            <Typography variant="body2">
              2021 Drone Rush. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
