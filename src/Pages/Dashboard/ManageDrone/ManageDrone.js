import { Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

const ManageDrone = ({ drone }) => {
  const { name, disc, price, img, _id } = drone;
  const history = useHistory();

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      fetch(`http://localhost:5000/drones?id=${_id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          window.location.reload();
        });
    }
  };
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ boxShadow: 3, display: "flex" }}>
        <CardMedia
          component="img"
          width="100%"
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
          <Typography variant="h5" color="success.main" sx={{ mb: 0, mt: 3 }}>
            Price: ${price}
          </Typography>
          <Button
            onClick={handleDelete}
            endIcon={<Delete />}
            color="error"
            sx={{ width: "100%" }}
            variant="contained"
            size="small"
          >
            Remove
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ManageDrone;
