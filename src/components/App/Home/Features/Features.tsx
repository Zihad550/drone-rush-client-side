import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import src from "images/feature-img.jpg";
import feature1 from "images/feature3-1.png";
import feature2 from "images/feature3-2.png";
import feature3 from "images/feature3-3.png";
const Features = () => {
  const features = [
    {
      id: 1,
      title: "Mobile Device Supported",
      about:
        "When an unknown printer took a galley of type and scrambled it to make.",
      src: feature1,
    },
    {
      id: 1,
      title: "Mobile Device Supported",
      about:
        "When an unknown printer took a galley of type and scrambled it to make.",
      src: feature2,
    },
    {
      id: 1,
      title: "Mobile Device Supported",
      about:
        "When an unknown printer took a galley of type and scrambled it to make.",
      src: feature3,
    },
  ];
  return (
    <Container sx={{ mb: 20 }}>
      <Grid container spacing={6}>
        <Grid item md={6} xs={12}>
          <img style={{ width: "100%", height: "auto" }} src={src} alt="" />
        </Grid>
        <Grid
          md={6}
          xs={12}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              height: "100%",
            }}
          >
            <Typography variant="h1">Features</Typography>
            {features.map((feature) => (
              <Box
                key={feature.id}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Box sx={{ mr: 2 }}>
                  <img src={feature.src} alt="" />
                </Box>
                <Box>
                  <Typography sx={{ mb: 1 }} variant="h5">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2">{feature.about}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Features;
