import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { Typography, Box } from "@mui/material";

const Address = () => {
  const addresses = [
    {
      id: 1,
      field: "Address:",
      value: "5171 W Campbell Ave undefined Kent, Utah 53127 United States",
      icon: <LocationOnIcon />,
    },
    {
      id: 2,
      field: "Call Us:",
      value: "+88 01855629170",
      icon: <PhoneIcon />,
    },
    {
      id: 3,
      field: "Email:",
      value: "dev.jehadhossain@gmail.com",
      icon: <EmailIcon />,
    },
    {
      id: 4,
      field: "Hours:",
      value: "10:00 - 18:00, Mon - Sat",
      icon: <AccessTimeIcon />,
    },
  ];
  return (
    <Box sx={{ mt: { xs: 3, md: 1 } }}>
      {addresses.map((address) => (
        <Box key={address.id} sx={{ display: "flex", mb: 1 }}>
          {/* icon */}
          <Box sx={{ mr: 1 }}>{address.icon}</Box>
          {/* text */}
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Typography variant="body1">{address.field}</Typography>
            <Typography variant="body1" sx={{ ml: 1 }}>
              {address.value}
            </Typography>
          </Box>
          {/* icon */}
        </Box>
      ))}
    </Box>
  );
};

export default Address;
