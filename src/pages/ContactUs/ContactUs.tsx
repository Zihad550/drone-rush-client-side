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
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import React, { useRef, useState } from 'react';

const ContactUs = () => {
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

  const contactInfos = [
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
    { id: 3, title: 'Phone', text: '+88 01855629170', icon: PhoneIcon },
  ];
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '100vh',
        py: { xs: 0, md: 0 },
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          width: '100%',
          minHeight: { xs: 180, md: 260 },
          background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          mb: 4,
          px: 2,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: 32, md: 48 },
            mb: 1,
            textAlign: 'center',
          }}
        >
          Get in Touch
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 400,
            fontSize: { xs: 16, md: 22 },
            opacity: 0.95,
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          We're here to help! Reach out for support, partnership, or just to say
          hello.
        </Typography>
      </Box>
      <Container maxWidth="md" sx={{ pb: 6 }}>
        {/* Main Contact Section */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            textAlign: 'center',
            mb: 2,
            fontSize: { xs: 28, md: 40 },
          }}
        >
          Contact Us
        </Typography>
        <Divider
          sx={{ mb: 4, mx: 'auto', width: 80, borderColor: 'primary.main' }}
        />
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Contact Form Card */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}
            >
              Get In Touch
            </Typography>
            <Box
              component="form"
              ref={form}
              onSubmit={sendEmail}
              autoComplete="off"
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  name="user_name"
                  label="Your Name"
                  variant="outlined"
                  fullWidth
                  required
                />
                <TextField
                  name="user_email"
                  label="Your Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Stack>
              <TextField
                name="subject"
                label="Subject"
                variant="outlined"
                fullWidth
                required
              />
              <TextField
                name="message"
                label="Message"
                variant="outlined"
                fullWidth
                required
                multiline
                minRows={4}
              />
              <Button
                type="submit"
                variant="contained"
                endIcon={<SendOutlined />}
                sx={{
                  fontWeight: 600,
                  fontSize: 18,
                  alignSelf: 'flex-end',
                  px: 4,
                  py: 1,
                }}
              >
                Send
              </Button>
            </Box>
            {success && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'success.light',
                  color: 'success.dark',
                  borderRadius: 2,
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                Message Sent Successfully
              </Box>
            )}
            {error && (
              <Box
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: 'error.light',
                  color: 'error.dark',
                  borderRadius: 2,
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                {error}
              </Box>
            )}
          </Paper>
          {/* Contact Info Card */}
          <Paper
            elevation={3}
            sx={{
              flex: 1,
              p: { xs: 2, md: 4 },
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: 'primary.main', mb: 2 }}
            >
              Contact Information
            </Typography>
            <Stack spacing={2}>
              {contactInfos.map((info) => (
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  key={info.id}
                >
                  <Box
                    sx={{
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      p: 1,
                      borderRadius: '50%',
                    }}
                  >
                    <info.icon sx={{ fontSize: 28 }} />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {info.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {info.text}
                    </Typography>
                  </Box>
                </Stack>
              ))}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Social
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
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      '&:hover': { bgcolor: 'primary.main' },
                    }}
                  >
                    <Icon sx={{ fontSize: 28 }} />
                  </IconButton>
                );
              })}
            </Stack>
          </Paper>
        </Stack>
        {/* Team/Support Section */}
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
            Meet Our Support Team
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {[
              {
                name: 'Jehad Hossain',
                role: 'Lead Support',
                img: profileImg,
              },
              {
                name: 'Sarah Lee',
                role: 'Customer Success',
                img: profileImg,
              },
              {
                name: 'Alex Kim',
                role: 'Technical Support',
                img: profileImg,
              },
            ].map((member) => (
              <Box
                key={member.name}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  bgcolor: 'grey.100',
                  borderRadius: 3,
                  boxShadow: 1,
                  minWidth: 180,
                }}
              >
                <Avatar
                  src={member.img}
                  alt={member.name}
                  sx={{ width: 72, height: 72, mb: 1.5, boxShadow: 2 }}
                />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                  {member.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'primary.main', fontWeight: 500 }}
                >
                  {member.role}
                </Typography>
              </Box>
            ))}
          </Stack>
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
