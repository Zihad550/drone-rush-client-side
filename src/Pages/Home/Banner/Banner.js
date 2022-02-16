import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import bannerBg from "../../../images/banner-bg.jpg";
import bannerImg from "../../../images/banner-img.svg";

const bgStyle = {
  background: `url(${bannerBg}) center `,
  width: "100%",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Banner = () => {
  return (
    <Box style={bgStyle} sx={{ height: "auto", mt: 3 }}>
      <Container>
        <Grid container spacing={{ sx: 2, md: 3 }}>
          <Grid sx={{ my: "auto", color: "white" }} item xs={12} md={6}>
            <Typography
              sx={{ fontWeight: 500, mb: 2 }}
              variant="h3"
              component="h1"
            >
              Professional <br />
              Drone For Every <br />
              Business
            </Typography>
            <Typography variant="body1">
              Welcome to the best drone website in the world.We have the most
              up-to-date information on drones for sale and new products
              everyday. Shop now!
            </Typography>{" "}
          </Grid>
          <Grid item xs={12} md={6}>
            <img src={bannerImg} alt="banner" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
