import { Box, Container, Grid, Typography, Button, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import bannerBg from "@/assets/banner-bg.jpg";
import bannerImg from "@/assets/banner-img.svg";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Banner = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${bannerBg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
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
        <Grid container spacing={{ xs: 4, md: 6 }} sx={{ position: 'relative', zIndex: 1 }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ 
            my: "auto", 
            color: "white",
            textAlign: { xs: "center", md: "left" },
            pr: { md: 8 },
            pl: { xs: 3, md: 5 },
            py: { xs: 4, md: 5 },
          }}>
            <Box
              sx={{
                display: 'inline-block',
                mb: 1,
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
              Premium Quality
            </Box>

            <Typography
              variant="h3"
              component="h1"
              sx={{ 
                mt: 2,
                mb: 3, 
                fontWeight: 600,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
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
              Professional <br />
              Drone For Every <br />
              Business
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4, 
                fontSize: { xs: 16, md: 18 },
                opacity: 0.9,
                textShadow: '0 1px 3px rgba(0,0,0,0.2)',
                maxWidth: "90%",
                mx: { xs: "auto", md: 0 }
              }}
            >
              Welcome to the best drone website in the world. We have the most
              up-to-date information on drones for sale and new products everyday.
            </Typography>

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
                boxShadow: '0 4px 14px rgba(79, 196, 207, 0.4)',
                background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
              }}
            >
              Shop Now
            </Button>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }} sx={{
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
          }}>
            <Box
              sx={{
                position: 'relative',
                width: { xs: '90%', md: '100%' },
                height: { xs: 'auto', md: '420px' },
                borderRadius: 4,
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, rgba(79, 196, 207, 0.3) 0%, rgba(79, 196, 207, 0) 50%)',
                  zIndex: 1
                }
              }}
            >
              <Box
                component="img"
                src={bannerImg}
                alt="Professional Drone"
                sx={{
                  maxWidth: "100%", 
                  maxHeight: "100%",
                  objectFit: "contain",
                  filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))',
                  transition: 'all 0.6s ease-in-out',
                  transform: 'scale(1.01)',
                  '&:hover': {
                    transform: 'scale(1.04)',
                    filter: 'drop-shadow(0 15px 20px rgba(0,0,0,0.4))'
                  }
                }}
              />
            </Box>

            {/* Decorative elements */}
            <Box sx={{
              position: 'absolute',
              top: { xs: '10%', md: '15%' },
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

export default Banner;
