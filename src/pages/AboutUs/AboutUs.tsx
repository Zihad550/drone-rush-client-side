import Title from '@/components/ui/Title';
import { Box, Container, Divider } from '@mui/material';
import { motion } from 'motion/react';
import AboutUsBanner from './AboutUsBanner/AboutUsBanner';
import OurTeam from './OurTeam';
import WhyUs from './WhyUs';

const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          py: { xs: 4, md: 8 },
        }}
      >
        <Container maxWidth="xl">
          {/* banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box
              sx={{
                mb: 10,
                mt: { xs: 2, md: 3 },
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -40,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60%',
                  height: 1,
                  bgcolor: 'rgba(0,0,0,0.06)',
                  borderRadius: 2,
                },
              }}
            >
              <AboutUsBanner />
            </Box>
          </motion.div>
          {/* mission statement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Box sx={{ my: 6, textAlign: 'center' }}>
              <Title>About Drone Rush</Title>
              <Divider
                sx={{
                  mb: 3,
                  mx: 'auto',
                  width: 80,
                  borderColor: 'primary.main',
                }}
              />
              <Title
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 400,
                  fontSize: { xs: 18, md: 22 },
                }}
              >
                At Drone Rush, we are passionate about delivering cutting-edge
                drone technology and exceptional service. Our mission is to
                empower individuals and businesses with innovative aerial
                solutions, ensuring quality, reliability, and a commitment to
                excellence in everything we do.
              </Title>
            </Box>
          </motion.div>
          {/* why us */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Box sx={{ my: 6 }}>
              <WhyUs />
            </Box>
          </motion.div>
          {/* our team */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Box sx={{ my: 6 }}>
              <Title variant="h4" sx={{ fontSize: { xs: 22, md: 32 } }}>
                Meet Our Team
              </Title>
              <Divider
                sx={{
                  mb: 3,
                  mx: 'auto',
                  width: 60,
                  borderColor: 'primary.main',
                }}
              />
              <OurTeam />
            </Box>
          </motion.div>
        </Container>
      </Box>
    </motion.div>
  );
};

export default AboutUs;
