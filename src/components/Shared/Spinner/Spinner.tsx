import { Box, CircularProgress } from '@mui/material';

const Spinner = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1300,
        bgcolor: 'rgba(255,255,255,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s',
        animation: 'fadeInSpinner 0.4s',
        '@keyframes fadeInSpinner': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <CircularProgress size={60} thickness={4.5} color="primary" />
    </Box>
  );
};

export default Spinner;
