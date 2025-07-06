import { Grid, Typography, Button } from "@mui/material";
import { Box, Container, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import src from "@/assets/about-us-bg.png";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const AboutUsBanner = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(79, 196, 207, 0.08) 0%, rgba(79, 196, 207, 0.15) 100%)`,
        py: { xs: 6, md: 8 },
        borderRadius: 4,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.13)} 0%, transparent 70%)`,
          zIndex: 0
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-80px',
          left: '45%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)} 0%, transparent 60%)`,
          zIndex: 0
        }
      }}
    >
      <Container>
        <Grid
          container
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            position: 'relative',
            zIndex: 1
          }}
        >
          <Grid
              size={{ xs: 12, md: 6 }}
            sx={{
              textAlign: { xs: "center", md: "left" },
              pr: { md: 8 },
              pl: { xs: 3, md: 5 },
              py: { xs: 4, md: 5 },
            }}
          >
            <Box
              sx={{
                display: 'inline-block',
                mb: 0.5,
                px: 1.5,
                py: 0.5,
                borderRadius: 5,
                bgcolor: 'primary.main',
                color: 'white',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}
            >
              Our Story
            </Box>

            <Typography 
              component="h1"
              sx={{ 
                mt: 2,
                mb: 4, 
                fontFamily: 'Courgette, cursive',
                fontSize: { xs: "2.8rem", md: "4rem" },
                fontWeight: 600,
                color: 'text.primary',
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: { xs: '25%', md: 0 },
                  width: { xs: '50%', md: '40%' },
                  height: 4,
                  bgcolor: 'primary.main',
                  borderRadius: 2
                }
              }}
            >
              Drone Rush
            </Typography>

            <Typography 
              variant="h5" 
              sx={{ 
                mb: 4,
                fontWeight: 300,
                color: 'text.secondary',
                lineHeight: 1.4,
                fontSize: { xs: 18, md: 22 }
              }}
            >
              Elevating possibilities with cutting-edge drone technology since 2010
            </Typography>

            <Typography variant="body1" sx={{ 
              mb: 3, 
              fontSize: { xs: 16, md: 17 }, 
              color: "text.secondary",
              lineHeight: 1.8,
              fontWeight: 400
            }}>
              As industry pioneers, we provide professionals with state-of-the-art drones to capture breathtaking aerial footage and accomplish complex tasks with precision and reliability.
            </Typography>

            <Box sx={{ 
              p: 3, 
              mt: 4, 
              mb: 3, 
              borderRadius: 3, 
              bgcolor: 'rgba(79, 196, 207, 0.07)',
              borderLeft: '3px solid', 
              borderColor: 'primary.main',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
            }}>
              <Typography variant="body1" sx={{ 
                fontWeight: 500, 
                fontSize: { xs: 16, md: 17 },
                color: 'text.primary',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>★</Box>
                Our expert support team is available 10:00–18:00 GMT+2 (Monday–Friday), ready to assist with all your drone needs.
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                mt: 2, 
                px: 3, 
                py: 1.2, 
                borderRadius: 2,
                textTransform: 'none',
                fontSize: 16,
                fontWeight: 500,
                boxShadow: '0 4px 14px rgba(79, 196, 207, 0.4)'
              }}
            >
              Contact Us
            </Button>
          </Grid>
          <Grid
              size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex", 
              justifyContent: "center",
              alignItems: "center",
              position: "relative"
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: '90%', md: '100%' },
                height: { xs: 'auto', md: '420px' },
                borderRadius: 4,
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(79, 196, 207, 0.3) 0%, rgba(79, 196, 207, 0) 50%)',
                  zIndex: 1
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '70%',
                  height: '40%',
                  background: 'linear-gradient(225deg, rgba(79, 196, 207, 0.2) 0%, rgba(79, 196, 207, 0) 70%)',
                  zIndex: 1
                }
              }}
            >
              <Box
                component="img"
                src={src}
                alt="Drone Rush - Advanced Drone Technology"
                sx={{
                  width: "100%", 
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  filter: 'contrast(1.05) brightness(1.02)',
                  transition: 'all 0.6s ease-in-out',
                  transform: 'scale(1.01)',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    filter: 'contrast(1.1) brightness(1.05)'
                  }
                }}
              />
            </Box>

            {/* Decorative elements */}
            <Box sx={{
              position: 'absolute',
              top: { xs: '5%', md: '12%' },
              right: { xs: '5%', md: '12%' },
              width: { xs: 70, md: 100 },
              height: { xs: 70, md: 100 },
              borderRadius: '50%',
              border: '2px dashed',
              borderColor: 'primary.main',
              opacity: 0.6,
              zIndex: 2
            }} />

            <Box sx={{
              position: 'absolute',
              bottom: { xs: '5%', md: '15%' },
              left: { xs: '10%', md: '15%' },
              width: { xs: 50, md: 70 },
              height: { xs: 50, md: 70 },
              borderRadius: '50%',
              bgcolor: 'primary.main',
              opacity: 0.1,
              zIndex: 2
            }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUsBanner;
