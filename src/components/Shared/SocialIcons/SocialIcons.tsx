import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Box, IconButton } from "@mui/material";

const SocialIcons = () => (
  <Box>
    <IconButton>
      <FacebookRoundedIcon />
    </IconButton>
    <IconButton>
      <TwitterIcon />
    </IconButton>
    <IconButton>
      <InstagramIcon />
    </IconButton>
    <IconButton>
      <PinterestIcon />
    </IconButton>
  </Box>
);

export default SocialIcons;
