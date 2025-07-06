import Title from '@/components/ui/Title';
import { Box, Container, Divider } from '@mui/material';
import AboutUsBanner from './AboutUsBanner';
import OurTeam from './OurTeam';
import WhyUs from './WhyUs';

const AboutUs = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
        {/* banner */}
        <AboutUsBanner />
        {/* mission statement */}
        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Title>About Drone Rush</Title>
          <Divider
            sx={{ mb: 3, mx: 'auto', width: 80, borderColor: 'primary.main' }}
          />
          <Title
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 400,
              fontSize: { xs: 18, md: 22 },
            }}
          >
            At Drone Rush, we are passionate about delivering cutting-edge drone
            technology and exceptional service. Our mission is to empower
            individuals and businesses with innovative aerial solutions,
            ensuring quality, reliability, and a commitment to excellence in
            everything we do.
          </Title>
        </Box>
        {/* why us */}
        <Box sx={{ my: 6 }}>
          <WhyUs />
        </Box>
        {/* our team */}
        <Box sx={{ my: 6 }}>
          <Title variant="h4" sx={{ fontSize: { xs: 22, md: 32 } }}>
            Meet Our Team
          </Title>
          <Divider
            sx={{ mb: 3, mx: 'auto', width: 60, borderColor: 'primary.main' }}
          />
          <OurTeam />
        </Box>
      </Container>
    </Box>
  );
};

export default AboutUs;
