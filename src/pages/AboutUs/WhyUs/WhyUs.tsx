import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import { Container, Grid, Typography } from "@mui/material";

const WhyUs = () => {
  const services = [
    {
      id: 1,
      service: "Complete buyer supply store",
      icon: LocalMallOutlinedIcon,
    },
    {
      id: 2,
      service: "Same day dispatch on all orders",
      icon: ArchiveOutlinedIcon,
    },
    {
      id: 3,
      service: "Free delivery on all orders",
      icon: LocalShippingOutlinedIcon,
    },
    {
      id: 4,
      service: "Professional advice and support",
      icon: SupportAgentOutlinedIcon,
    },
    {
      id: 5,
      service: "Fall savings are in the air",
      icon: SavingsOutlinedIcon,
    },
  ];

  return (
    <Container sx={{ my: 10 }}>
      <Typography variant="h2" sx={{ textAlign: "center", mb: 4 }}>
        Why Shop With Us?
      </Typography>
      <Grid container spacing={2}>
        {services.map((service) => (
          <Grid
            key={service.id}
            style={{ xs: 6, sm: 4, md: 2.4, lg: 2.4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <service.icon sx={{ fontSize: 80, color: "gray" }} />
            <Typography
              variant="body1"
              sx={{ textAlign: "center", width: "50%" }}
            >
              {service.service}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WhyUs;
