import { Typography } from "@mui/material";
import src from "images/faq.mp4";

const FAQ = () => {
  return (
    <div>
      <Typography variant="h1">Common Question</Typography>
      <video width="320" height="240" controls>
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

export default FAQ;
