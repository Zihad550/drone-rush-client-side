import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid, Typography } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { Container } from "@mui/system";
import src from "images/faq.mp4";

const FAQ = () => {
  const faqs = [
    {
      id: 1,
      question: "What is a drone?",
      answer:
        "Drones are commonly referred to as Unmanned Aerial Vehicles ( UAV ) are automated aircraft operating systems operated from a remote location or without direct human control.",
    },
    {
      id: 2,
      question: "What is the best drone?",
      answer:
        " DJI is one of the top consumer drone manufacturers, known mainly for their Mavic series . The Mavi series has become the quintessential drone for new to intermediate pilots and videographers and the simultaneous launch in late 2018 of the Mavic 2 Pro and Mavic 2 Zoom was huge news in the industry.",
    },
    {
      id: 3,
      question: "Is it difficult to fly a drone?",
      answer:
        "There is no doubt that autonomy, especially the ability for a GPS-enabled drone to hover perfectly in place, makes flying extremely easy. In truth, almost anyone can fly the DJI Mavic Pro – tap the button to take off, it hovers with extreme accuracy, then press the button to land almost exactly where you took off.",
    },
    {
      id: 4,
      question: "How long can drones fly for?",
      answer:
        "Small Drones can have anywhere from 700 to 1,300 feet of range. Medium drones can have up to 3.1 miles or 5 kilometres. High-end drones can be programmed with GPS capabilities allowing them to more accurately stay within the set boundaries set by the controller.",
    },
    {
      id: 5,
      question: "Can I put a camera on my drone?",
      answer:
        "Buying a drone that comes with support to add your own camera is a great option for photographers and videographers that have a greater concern for the quality of the images and video they intend to capture. Of course, this option does come with its own bag of goodies and bummers.",
    },
  ];
  return (
    <Container sx={{ mb: 15 }}>
      <Typography variant="h1" sx={{ mx: "auto", mb: 3 }}>
        Common Question
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <video width="100%" height="auto" controls>
            <source src={src} type="video/mp4" />
          </video>
        </Grid>
        <Grid item md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            {faqs.map((faq) => (
              <Accordion key={faq.id} sx={{ my: 0.5 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FAQ;
