import { SendOutlined } from "@mui/icons-material";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import Navigation from "../../Shared/Navigation/Navigation";

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {/* navigation */}
      <Navigation />
      {/* contactus container */}
      <Container style={{ margin: "4rem auto", mx: "auto" }}>
        <Typography variant="h1" sx={{ mb: 4, mx: "auto" }}>
          Contact Us
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={6} sx={{ my: "auto" }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Have Questions?
            </Typography>
            <Typography variant="body2">
              Great, we love talking to our customers and helping you select the
              solution that fits your needs.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSubmit}>
              <TextField
                sx={{ width: "49%" }}
                label="Your Name"
                type="text"
                size="small"
                variant="outlined"
              />{" "}
              <TextField
                sx={{ width: "50%" }}
                label="Your Email"
                size="small"
                variant="outlined"
                type="email"
              />
              <TextField
                sx={{ width: "100%", mt: 1 }}
                multiline
                rows={4}
                label="Message"
                size="small"
                variant="outlined"
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
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ContactUs;
