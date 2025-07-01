import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/material";
import src from "@/assets/about-us-bg.png";

const AboutUsBanner = () => {
  return (
    <Box sx={{ background: "#f2eef5" }}>
      <Container>
        <Grid
          container
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            p: { xs: 5, md: 0 },
          }}
        >
          <Grid
            size={{ md: 6, xs: 12 }}
            sx={{
              textAlign: { xs: "center", md: "left" },
            }}
          >
            <Typography variant="h1" sx={{ mb: 5, mx: "auto" }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Founded in 2010, Fox shop is the one stop shop for the barbering
              world. We provide barbers with the necessary tools to progress
              their craft and push the industry as far forward as possible.
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Based in Cardiff, South Wales, Fox shop operates primarily in the
              UK, but international sales are welcomed and dispatched daily. We
              have a trade counter with a shop front and we encourage you to
              come in and see us!
            </Typography>
            <Typography variant="body1">
              Our support is available 10.00 – 18.00 GMT + 2 (Monday – Friday).
              We usually get back to you within 24 hours.
            </Typography>
          </Grid>
          <Grid
            size={{ md: 6, xs: 12 }}
            sx={{ display: { md: "flex", xs: "none" } }}
          >
            <img style={{ width: "100%", height: "auto" }} src={src} alt="" />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsBanner;
