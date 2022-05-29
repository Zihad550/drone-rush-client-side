import { SendOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import IDrone from "../../../types/DroneType";
import Header from "../../Shared/Header";

const Purchase = () => {
  const { name } = useParams();
  const [drone, setDrone] = useState({} as IDrone);
  const { disc, img, price } = drone;
  const { user } = useAuth();

  const [orderInfo, setOrderInfo] = useState({
    userName: user.displayName || "",
    email: user.email || "",
    phone: "",
  });

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const field = e.target.name;
    const value = e.target.value;
    // ! note: update: to proper type
    const newInfo: any = { ...orderInfo };
    newInfo[field] = value;
    setOrderInfo(newInfo);
  };

  const handlePurchase = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // collect data
    const order = {
      ...orderInfo,
      productName: name,
      disc,
      img,
      price,
      orderStatus: "pending",
    };
    // send to the server
    fetch("https://still-castle-43681.herokuapp.com/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("successfully order placed");
        }
      });
  };

  useEffect(() => {
    fetch(`https://still-castle-43681.herokuapp.com/drones/${name}`)
      .then((res) => res.json())
      .then((data) => setDrone(data));
  }, [name]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header />
      <Container sx={{ height: "100%" }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
          Purchase
        </Typography>
        <Grid
          sx={{ display: "flex", alignItems: "center" }}
          container
          spacing={{ xs: 2, md: 3 }}
        >
          <Grid item xs={12} md={6}>
            <Card sx={{ boxShadow: 3, display: "flex" }}>
              <CardMedia
                component="img"
                width="100%"
                height="100%"
                image={img}
                alt="green iguana"
              />
              <CardContent sx={{ pb: 0 }}>
                <Typography gutterBottom variant="h5" component="h4">
                  {name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {disc}
                </Typography>
                <Typography
                  variant="h5"
                  color="success.main"
                  sx={{ mb: 0, mt: 3 }}
                >
                  Price: ${price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid sx={{ my: "auto" }} item xs={12} md={6}>
            <form onSubmit={handlePurchase}>
              <TextField
                required
                onChange={handleOnBlur}
                name="userName"
                label="Your name"
                defaultValue={user.displayName}
                size="small"
                fullWidth
              />
              <TextField
                required
                label="Phone Number"
                type="number"
                onChange={handleOnBlur}
                size="small"
                name="phone"
                fullWidth
                margin="dense"
              />
              <TextField
                required
                label="Your email"
                defaultValue={user.email}
                type="email"
                size="small"
                onChange={handleOnBlur}
                name="email"
                fullWidth
                margin="dense"
              />
              <TextField
                required
                label="Enter your city name"
                size="small"
                fullWidth
                margin="dense"
              />

              <Button
                endIcon={<SendOutlined />}
                variant="contained"
                type="submit"
              >
                Send
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Purchase;
