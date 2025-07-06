import src from '@/assets/profile.png';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';

const OurTeam = () => {
  const members = [
    {
      id: 1,
      name: 'Jehad Hossain',
      title: 'Founder & CEO',
      src: src,
      linkedin: 'https://www.linkedin.com/in/jehad-hossain',
      devTo: 'https://dev.to/jehad_hossain',
      facebook: 'https://www.facebook.com/zihad31hussain',
      twitter: 'https://twitter.com/Jehadhossain_',
    },
    {
      id: 2,
      name: 'Jehad Hossain',
      title: 'Frontend Developer',
      src: src,
      linkedin: 'https://www.linkedin.com/in/jehad-hossain',
      devTo: 'https://dev.to/jehad_hossain',
      facebook: 'https://www.facebook.com/zihad31hussain',
      twitter: 'https://twitter.com/Jehadhossain_',
    },
    {
      id: 3,
      name: 'Jehad Hossain',
      title: 'Backend Developer',
      src: src,
      linkedin: 'https://www.linkedin.com/in/jehad-hossain',
      devTo: 'https://dev.to/jehad_hossain',
      facebook: 'https://www.facebook.com/zihad31hussain',
      twitter: 'https://twitter.com/Jehadhossain_',
    },
    {
      id: 4,
      name: 'Jehad Hossain',
      title: 'Web Developer',
      src: src,
      linkedin: 'https://www.linkedin.com/in/jehad-hossain',
      devTo: 'https://dev.to/jehad_hossain',
      facebook: 'https://www.facebook.com/zihad31hussain',
      twitter: 'https://twitter.com/Jehadhossain_',
    },
  ];
  return (
    <Box sx={{ textAlign: 'center', px: 0, py: 0, mb: 4 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(auto-fit, minmax(220px, 1fr))',
          },
          gap: { xs: 2, sm: 4 },
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        {members.map((member) => (
          <Paper
            key={member.id}
            elevation={2}
            sx={{
              background: '#fff',
              borderRadius: 4,
              boxShadow: '0 2px 16px rgba(59,130,246,0.07)',
              p: { xs: 2, sm: 4 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid #e5e7eb',
              transition:
                'transform 0.18s cubic-bezier(0.4,2,0.6,1), box-shadow 0.18s cubic-bezier(0.4,2,0.6,1)',
              position: 'relative',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.03)',
                boxShadow: '0 8px 32px rgba(59,130,246,0.13)',
                borderColor: '#3b82f6',
              },
            }}
          >
            {/* image */}
            <Box
              sx={{
                width: { xs: 64, sm: 96 },
                height: { xs: 64, sm: 96 },
                borderRadius: '50%',
                overflow: 'hidden',
                mb: 2,
                border: '4px solid #06b6d4',
                boxShadow: '0 2px 8px rgba(59,130,246,0.09)',
                background: '#f0f9ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src={member.src}
                alt={member.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
            {/* socials */}
            <Stack
              direction="row"
              spacing={1}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 1 }}
            >
              <IconButton
                component="a"
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background:
                    'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  borderRadius: '50%',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'box-shadow 0.18s, transform 0.18s',
                  boxShadow: '0 1px 4px rgba(59,130,246,0.09)',
                  color: '#fff',
                  '&:hover': {
                    transform: 'scale(1.12)',
                    boxShadow: '0 4px 16px rgba(59,130,246,0.18)',
                  },
                }}
              >
                <LinkedInIcon sx={{ fontSize: 24 }} />
              </IconButton>
              <IconButton
                component="a"
                href={member.devTo}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background:
                    'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  borderRadius: '50%',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'box-shadow 0.18s, transform 0.18s',
                  boxShadow: '0 1px 4px rgba(59,130,246,0.09)',
                  color: '#fff',
                  '&:hover': {
                    transform: 'scale(1.12)',
                    boxShadow: '0 4px 16px rgba(59,130,246,0.18)',
                  },
                }}
              >
                <LogoDevIcon sx={{ fontSize: 24 }} />
              </IconButton>
              <IconButton
                component="a"
                href={member.facebook}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background:
                    'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  borderRadius: '50%',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'box-shadow 0.18s, transform 0.18s',
                  boxShadow: '0 1px 4px rgba(59,130,246,0.09)',
                  color: '#fff',
                  '&:hover': {
                    transform: 'scale(1.12)',
                    boxShadow: '0 4px 16px rgba(59,130,246,0.18)',
                  },
                }}
              >
                <FacebookIcon sx={{ fontSize: 24 }} />
              </IconButton>
              <IconButton
                component="a"
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  background:
                    'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  borderRadius: '50%',
                  width: 38,
                  height: 38,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'box-shadow 0.18s, transform 0.18s',
                  boxShadow: '0 1px 4px rgba(59,130,246,0.09)',
                  color: '#fff',
                  '&:hover': {
                    transform: 'scale(1.12)',
                    boxShadow: '0 4px 16px rgba(59,130,246,0.18)',
                  },
                }}
              >
                <TwitterIcon sx={{ fontSize: 24 }} />
              </IconButton>
            </Stack>
            {/* about */}
            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#1a202c',
                  mb: 0.5,
                }}
              >
                {member.name}
              </Typography>
              <Typography
                sx={{ fontSize: 15, color: '#06b6d4', fontWeight: 500 }}
              >
                {member.title}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default OurTeam;
