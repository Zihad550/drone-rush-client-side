import { SendOutlined } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import {
  Alert,
  Button, Container, Grid,
  TextField,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import emailjs from "emailjs-com";
import React, { useRef, useState } from "react";

const ContactUs = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  console.log(success);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    form.current &&
    emailjs
      .sendForm(
        "service_f285mw9",
        "template_dp3s2l4",
        form.current,
        "user_zhFfInA9MfeHXHO7YmUav"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          setError(error.text);
        }
      );
    setSuccess(true);
  };

  const socials = [
    {
      id: 1,
      icon: PersonIcon,
      link: "https://jehad-hossain.netlify.app/",
      iconColor: "orange",
    },
    {
      id: 2,
      icon: GitHubIcon,
      link: "https://github.com/Zihad550",
      iconColor: "#171515",
    },
    {
      id: 3,
      icon: LinkedInIcon,
      link: "https://www.linkedin.com/in/jehad-hossain/",
      iconColor: "#0072b1",
    },
    {
      id: 4,
      icon: FacebookIcon,
      link: "https://www.facebook.com/zihad31hussain/",
      iconColor: "#4267B2",
    },
  ];

  const contactInfos = [
    {
      id: 1,
      title: "Address",
      text: "Dhaka, Bangladesh",
      icon: LocationOnIcon,
    },
    {
      id: 2,
      title: "Email",
      text: "jehadhossain008@gmail.com",
      icon: EmailIcon,
    },
    { id: 3, title: "Phone", text: "+88 01855629170", icon: PhoneIcon },
  ];
  return (
     
      <Container sx={{ mb: { xs: 5, md: 0 } }}>
        <Typography variant="h1" sx={{ my: 4, mx: "auto" }}>
          Contact Us
        </Typography>
        <Grid
          sx={{
            minHeight: "500px",
            my: "auto",
          }}
          container
          spacing={{ xs: 2, md: 3 }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              textAlign="center"
              sx={{ fontSize: 30, mb: 1 }}
              variant="h2"
            >
              Get In Touch
            </Typography>
            <form onSubmit={sendEmail} ref={form}>
              <TextField
                sx={{ width: "49%" }}
                label="Your Name"
                type="text"
                size="small"
                variant="outlined"
                name="user_name"
                required
              />{" "}
              <TextField
                sx={{ width: "50%" }}
                label="Your Email"
                size="small"
                variant="outlined"
                type="email"
                name="user_email"
                required
              />
              <TextField
                margin="dense"
                fullWidth
                size="small"
                variant="outlined"
                required
                label="Subject"
                name="subject"
              />
              <TextField
                sx={{ width: "100%", mt: 1 }}
                multiline
                rows={4}
                label="Message"
                size="small"
                variant="outlined"
                name="message"
                required
              />
              <br />
              <Button
                variant="contained"
                type="submit"
                sx={{ background: "info.main", mt: 1 }}
                endIcon={<SendOutlined />}
              >
                send
              </Button>
            </form>
            {success && (
              <Alert sx={{ mt: 1 }} severity="success">
                Message Sended Successfully
              </Alert>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography
              textAlign="center"
              sx={{ fontSize: 30, mb: 1 }}
              variant="h2"
            >
              Contact Information
            </Typography>
            {/* contact information */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* location phone and email */}
              <Box>
                {contactInfos.map((info) => (
                  <Box
                    key={info.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    {/*  icon */}
                    <Box
                      sx={{
                        border: "1px solid black",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2rem",
                        height: "2rem",
                      }}
                    >
                      <info.icon />
                    </Box>
                    {/* text */}
                    <Box>
                      <Typography sx={{ fontWeight: 600 }} variant="h5">
                        {info.title}
                      </Typography>
                      <Typography variant="body1">{info.text}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* social */}
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Social</Typography>
                <Box>
                  {socials.map((social) => (
                    <a
                      style={{ color: social.iconColor }}
                      key={social.id}
                      target="_blank"
                      href={social.link}
                      rel="noreferrer"
                    >
                      <social.icon sx={{ fontSize: 40 }} />
                    </a>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
  );
};

export default ContactUs;
