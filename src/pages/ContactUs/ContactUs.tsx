import emailjs from '@emailjs/browser';
import { SendOutlined } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
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
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="md">
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
      </Container>
    </Box>
  );
};

export default ContactUs;
