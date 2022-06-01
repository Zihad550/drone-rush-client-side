import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import src from "../../../../images/about-bg.png";

const AboutUsBanner = () => {
  return (
    <Box
      sx={{
        background: `url(${src}) no-repeat center `,
        width: "100%",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "600px",
          ml: 50,
          py: 20,
        }}
      >
        <Typography variant="h1" sx={{ mb: 5 }}>
          About Us
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Founded in 2010, Fox shop is the one stop shop for the barbering
          world. We provide barbers with the necessary tools to progress their
          craft and push the industry as far forward as possible.
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Based in Cardiff, South Wales, Fox shop operates primarily in the UK,
          but international sales are welcomed and dispatched daily. We have a
          trade counter with a shop front and we encourage you to come in and
          see us!
        </Typography>
        <Typography variant="body1">
          Our support is available 10.00 – 18.00 GMT + 2 (Monday – Friday). We
          usually get back to you within 24 hours.
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutUsBanner;
