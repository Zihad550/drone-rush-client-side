import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LogoDevIcon from "@mui/icons-material/LogoDev";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import src from "../../../../images/profile.png";
import "./OutTeam.css";

const OurTeam = () => {
  const members = [
    {
      id: 1,
      name: "Jehad Hossain",
      src: src,
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
    {
      id: 2,
      name: "Jehad Hossain",
      src: src,
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
    {
      id: 3,
      name: "Jehad Hossain",
      src: src,
      linkedin: "https://www.linkedin.com/in/jehad-hossain",
      devTo: "https://dev.to/jehad_hossain",
      facebook: "https://www.facebook.com/zihad31hussain",
      twitter: "https://twitter.com/Jehadhossain_",
    },
    {
      id: 4,
      name: "Jehad Hossain",
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
      <Box sx={{ display: "flex" }}>
        {members.map((member) => (
          <Box className="team">
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
                <LinkedInIcon className="social-icon" sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                href={member.devTo}
                className="social-btn"
                target="_blank"
              >
                <LogoDevIcon className="social-icon" sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                href={member.facebook}
                className="social-btn"
                target="_blank"
              >
                <FacebookIcon className="social-icon" sx={{ color: "white" }} />
              </IconButton>
              <IconButton
                href={member.twitter}
                className="social-btn"
                target="_blank"
              >
                <TwitterIcon className="social-icon" sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default OurTeam;
