import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, Container, Grid, IconButton, Typography } from "@mui/material";
import src from "@/assets/profile.png";
import "./OutTeam.css";

const OurTeam = () => {
  const members = [
    {
      id: 1,
      name: "Jehad Hossain",
      title: "Founder & CEO",
      src: src,
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
    {
      id: 2,
      name: "Jehad Hossain",
      title: "Frontend Developer",
      src: src,
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
    {
      id: 3,
      name: "Jehad Hossain",
      title: "Backend Developer",
      src: src,
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
    {
      id: 4,
      name: "Jehad Hossain",
      title: "Web Developer",
      src: src,
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
  ];
  return (
    <Container sx={{ mb: 10 }}>
      <Typography variant="h2" sx={{ textAlign: "center", mb: 4 }}>
        Our Team
      </Typography>
      <Grid container spacing={2}>
        {members.map((member) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            className="team"
            sx={{ mb: { xs: 5, md: 0 } }}
          >
            {/* image */}
            <Box
              className="team-img-wrapper"
              sx={{
                mx: 2,
                background: "blue",
                borderRadius: "50%",
                overflow: "hidden",
              }}
              key={member.id}
            >
              <img
                src={member.src}
                style={{ width: "100%", height: "auto" }}
                alt={member.name}
              />
            </Box>
            {/* socials */}
            <Box
              className="socials"
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <IconButton
                href={member.linkedin}
                className="social-btn"
                target="_blank"
              >
                <LinkedInIcon
                  className="social-icon"
                  sx={{ color: "white", fontSize: 35 }}
                />
              </IconButton>
              <IconButton
                href={member.devTo}
                className="social-btn"
                target="_blank"
              >
                <LogoDevIcon
                  className="social-icon"
                  sx={{ color: "white", fontSize: 35 }}
                />
              </IconButton>
              <IconButton
                href={member.facebook}
                className="social-btn"
                target="_blank"
              >
                <FacebookIcon
                  className="social-icon"
                  sx={{ color: "white", fontSize: 35 }}
                />
              </IconButton>
              <IconButton
                href={member.twitter}
                className="social-btn"
                target="_blank"
              >
                <TwitterIcon
                  className="social-icon"
                  sx={{ color: "white", fontSize: 35 }}
                />
              </IconButton>
            </Box>

            {/* about */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h5">{member.name}</Typography>
              <Typography variant="body2" sx={{ color: "#2e2e2e" }}>
                {member.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default OurTeam;
