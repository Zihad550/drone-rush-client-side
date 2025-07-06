import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import { Box, Paper, Typography } from '@mui/material';

const WhyUs = () => {
  const services = [
    {
      id: 1,
      service: 'Complete buyer supply store',
      icon: LocalMallOutlinedIcon,
    },
    {
      id: 2,
      service: 'Same day dispatch on all orders',
      icon: ArchiveOutlinedIcon,
    },
    {
      id: 3,
      service: 'Free delivery on all orders',
      icon: LocalShippingOutlinedIcon,
    },
    {
      id: 4,
      service: 'Professional advice and support',
      icon: SupportAgentOutlinedIcon,
    },
    {
      id: 5,
      service: 'Fall savings are in the air',
      icon: SavingsOutlinedIcon,
    },
  ];

  return (
    <Box sx={{ textAlign: 'center', px: 0, py: 0, mb: 4 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          color: 'primary.main',
          mb: 1.5,
          fontSize: { xs: 22, sm: 28 },
          letterSpacing: '-0.5px',
        }}
      >
        Why Choose Us?
      </Typography>
      <Box
        sx={{
          width: 48,
          height: 4,
          background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
          borderRadius: 2,
          mx: 'auto',
          mb: 4,
        }}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(210px, 1fr))',
          },
          gap: { xs: 2, sm: 4 },
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Paper
              key={service.id}
              elevation={2}
              sx={{
                background: '#fff',
                borderRadius: 3,
                boxShadow: '0 2px 16px rgba(59,130,246,0.07)',
                p: { xs: 2, sm: 4 },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #e5e7eb',
                transition:
                  'transform 0.18s cubic-bezier(0.4,2,0.6,1), box-shadow 0.18s cubic-bezier(0.4,2,0.6,1)',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.03)',
                  boxShadow: '0 8px 32px rgba(59,130,246,0.13)',
                  borderColor: '#3b82f6',
                },
              }}
            >
              <Icon
                sx={{
                  fontSize: { xs: 40, sm: 56 },
                  mb: 2,
                  background:
                    'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  color: '#06b6d4',
                }}
              />
              <Typography
                sx={{
                  fontSize: 17,
                  color: '#374151',
                  mt: 1,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                {service.service}
              </Typography>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
};

export default WhyUs;
