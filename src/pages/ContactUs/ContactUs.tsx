import profileImg from '@/assets/profile.png';
import emailjs from '@emailjs/browser';
import { SendOutlined } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import {
  alpha,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import React, { useRef, useState } from 'react';

const ContactUs = () => {
  const theme = useTheme();
  const form = useRef<HTMLFormElement | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    if (!form.current) return;
    e.preventDefault();
    setSuccess(false);
    emailjs
      .sendForm(
        'service_f285mw9',
        'template_dp3s2l4',
        form.current,
        'user_zhFfInA9MfeHXHO7YmUav'
      )
      .then(
        () => {
          setSuccess(true);
          setError('');
        },
        (error) => {
          setError(error.text);
          setSuccess(false);
        }
      );
  };

  const socials = [
    {
      id: 1,
      icon: PersonIcon,
      link: 'https://jehad-hossain.netlify.app/',
    },
    {
      id: 2,
      icon: GitHubIcon,
      link: 'https://github.com/Zihad550',
    },
    {
      id: 3,
      icon: LinkedInIcon,
      link: 'https://www.linkedin.com/in/jehad-hossain/',
    },
    {
      id: 4,
      icon: FacebookIcon,
      link: 'https://www.facebook.com/zihad31hussain/',
    },
  ];

  const contactInfo: Array<{
    id: number;
    title: string;
    text: string;
    icon: React.ElementType;
  }> = [
    {
      id: 1,
      title: 'Address',
      text: 'Dhaka, Bangladesh',
      icon: LocationOnIcon,
    },
    {
      id: 2,
      title: 'Email',
      text: 'jehadhossain008@gmail.com',
      icon: EmailIcon,
    },
    {
      id: 3,
      title: 'Phone',
      text: '+88 01855629170',
      icon: PhoneIcon,
    },
  ];
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, transparent 70%)`,
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-150px',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.main,
            0.08
          )} 0%, transparent 60%)`,
          zIndex: 0,
        },
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 300, md: 400 },
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.light,
            0.12
          )} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'text.primary',
          py: { xs: 6, md: 8 },
          mb: 6,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(/path-to-pattern.svg) repeat',
            opacity: 0.03,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              mb: 2,
              px: 2,
              py: 0.5,
              borderRadius: 5,
              bgcolor: 'primary.main',
              color: 'white',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
              textTransform: 'uppercase',
              textAlign: 'center',
              mx: 'auto',
              display: 'block',
              width: 'fit-content',
            }}
          >
            Contact Us
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Courgette, cursive',
              fontWeight: 600,
              fontSize: { xs: '2.8rem', md: '4rem' },
              mb: 2,
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                bgcolor: 'primary.main',
                borderRadius: 2,
              },
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
              fontSize: { xs: '1rem', md: '1.25rem' },
              opacity: 0.9,
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
              mt: 3,
              color: 'text.secondary',
            }}
          >
            We're here to help! Reach out for support, partnership, or just to
            say hello. Our team is ready to assist you with any questions or
            inquiries you may have.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 8, position: 'relative', zIndex: 1 }}>
        {/* Main Contact Section */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: 'Courgette, cursive',
              fontWeight: 600,
              color: 'text.primary',
              mb: 2,
              fontSize: { xs: '2rem', md: '2.8rem' },
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 3,
                bgcolor: 'primary.main',
                borderRadius: 2,
              },
            }}
          >
            Contact Us
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 700,
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.1rem' },
            }}
          >
            Have questions or need assistance? Fill out the form below and our
            team will get back to you as soon as possible.
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            gap: 4,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 3,
            overflow: 'hidden',
            '&:hover': {
              boxShadow: 6,
              transform: 'translateY(-2px)',
              transition: 'all 0.3s ease-in-out',
            },
            transition: 'all 0.3s ease-in-out',
          }}
        >
          {/* Contact Form */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                width: '1px',
                bgcolor: 'divider',
                display: { xs: 'none', lg: 'block' },
              },
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '1.8rem' },
                }}
              >
                Send Us a Message
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We'll get back to you within 24 hours
              </Typography>
            </Box>
            <Box
              component="form"
              ref={form}
              onSubmit={sendEmail}
              autoComplete="off"
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  name="user_name"
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'divider',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
                <TextField
                  name="user_email"
                  label="Your Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'divider',
                      },
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              </Stack>
              <TextField
                name="subject"
                label="Subject"
                variant="outlined"
                fullWidth
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'divider',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <TextField
                name="message"
                label="Message"
                variant="outlined"
                fullWidth
                required
                multiline
                minRows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'divider',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendOutlined />}
                  sx={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    px: 4,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Send Message
                </Button>
              </Box>
            </Box>
            {success && (
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  bgcolor: 'success.light',
                  color: 'success.dark',
                  borderRadius: 2,
                  fontWeight: 600,
                  textAlign: 'center',
                  borderLeft: '4px solid',
                  borderColor: 'success.main',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                }}
              >
                🎉 Message Sent Successfully! We'll get back to you soon.
              </Box>
            )}
            {error && (
              <Box
                sx={{
                  mt: 1,
                  p: 2,
                  bgcolor: 'error.light',
                  color: 'error.dark',
                  borderRadius: 2,
                  fontWeight: 600,
                  textAlign: 'center',
                  borderLeft: '4px solid',
                  borderColor: 'error.main',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                }}
              >
                ⚠️ {error}
              </Box>
            )}
          </Box>

          {/* Contact Info Card */}
          <Box
            sx={{
              width: { xs: '100%', lg: '35%' },
              p: { xs: 3, md: 4 },
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              position: 'relative',
              backgroundColor: alpha(theme.palette.primary.light, 0.05),
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              },
            }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '1.8rem' },
                }}
              >
                Contact Information
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Have questions or need assistance? We're here to help you with
                any inquiries you may have.
              </Typography>
            </Box>

            <Divider sx={{ my: 1, borderColor: 'divider' }} />

            <Stack spacing={3} sx={{ mt: 1 }}>
              {contactInfo.map((info) => (
                <Box
                  key={info.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    {React.cloneElement(info.icon, { sx: { fontSize: 24 } })}
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 600, mb: 0.5 }}
                    >
                      {info.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.text}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 2, borderColor: 'divider' }} />

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={2}>
                {socials.map((social) => {
                  const Icon = social.icon;
                  return (
                    <IconButton
                      key={social.id}
                      component="a"
                      href={social.link}
                      target="_blank"
                      rel="noreferrer"
                      sx={{
                        bgcolor: 'background.paper',
                        color: 'text.primary',
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'primary.contrastText',
                          transform: 'translateY(-2px)',
                          boxShadow: 3,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </IconButton>
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Box>
        {/* Team/Support Section */}
        <Box sx={{ mt: 10, mb: 8, textAlign: 'center' }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Courgette, cursive',
                fontWeight: 600,
                color: 'text.primary',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -10,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 80,
                  height: 4,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                },
              }}
            >
              Meet Our Support Team
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: 700,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
              }}
            >
              Our dedicated team is here to provide you with the best support
              and assistance.
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 4,
              mt: 4,
              px: { xs: 2, md: 0 },
            }}
          >
            {[
              {
                name: 'Jehad Hossain',
                role: 'Lead Support',
                img: profileImg,
                bio: 'Expert in customer relations and technical support.',
              },
              {
                name: 'Sarah Lee',
                role: 'Customer Success',
                img: profileImg,
                bio: 'Dedicated to ensuring your complete satisfaction.',
              },
              {
                name: 'Alex Kim',
                role: 'Technical Support',
                img: profileImg,
                bio: 'Technical wizard ready to solve any issues.',
              },
            ].map((member) => (
              <Box
                key={member.name}
                sx={{
                  bgcolor: 'background.paper',
                  borderRadius: 3,
                  overflow: 'hidden',
                  boxShadow: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 4,
                  },
                }}
              >
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      mx: 'auto',
                      mb: 3,
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: -5,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: '50%',
                        zIndex: 0,
                      },
                    }}
                  >
                    <Avatar
                      src={member.img}
                      alt={member.name}
                      sx={{
                        width: 110,
                        height: 110,
                        mx: 'auto',
                        position: 'relative',
                        zIndex: 1,
                        border: '4px solid',
                        borderColor: 'background.paper',
                        boxShadow: 2,
                      }}
                    />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {member.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 600,
                      mb: 2,
                      fontSize: '0.9rem',
                    }}
                  >
                    {member.role}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ fontSize: '0.9rem' }}
                  >
                    {member.bio}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    bgcolor: 'action.hover',
                    px: 3,
                    py: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                  }}
                >
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <EmailIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" sx={{ color: 'text.secondary' }}>
                    <PhoneIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              textAlign: 'center',
              mb: 3,
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>
                How quickly do you respond to messages?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              We aim to respond to all inquiries within 24 hours on business
              days.
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>
                Can I visit your office in person?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Yes! Please contact us to schedule a visit so we can ensure
              someone is available to greet you.
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 600 }}>
                Do you offer technical support?
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              Absolutely! Our technical support team is available via email,
              phone, and live chat during business hours.
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Map Section */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              textAlign: 'center',
              mb: 3,
            }}
          >
            Our Location
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 280,
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 2,
              mb: 2,
            }}
          >
            <iframe
              title="Office Location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=90.4125%2C23.8103%2C90.4125%2C23.8103&amp;layer=mapnik"
              style={{ border: 0, width: '100%', height: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ textAlign: 'center', color: 'text.secondary' }}
          >
            Dhaka, Bangladesh
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
