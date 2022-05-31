import { Add } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

// types
type DroneInfo = {
  name: string;
  price: number;
  img: string;
  disc: string;
};

const AddDrone = () => {
  const [droneInfo, setDroneInfo] = useState<DroneInfo>({
    name: "",
    price: 0,
    img: "",
    disc: "",
  });
  const [isAdded, setIsAdded] = useState(false);

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const field: string | number = e.target.name;
    const value = e.target.value;
    const newInfo: any = { ...droneInfo };
    newInfo[field] = value;
    setDroneInfo(newInfo);
  };
  /* const { data, error, isLoading, isSuccess } = useAPI<IDrone>(
    ProductService.addProduct({ ...droneInfo, deletable: true })
  ); */
  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /*  axiosInstance
      .post("/drones", { ...droneInfo, deletable: true })
      .then(({ data }) => {
        if (data.insertedId) {
          setIsAdded(true);
        }
      }); */
  };
  return (
    <>
      {/* modal */}
      {isAdded && (
        <Box sx={{ position: "fixed", top: "65%", left: "40%" }}>
          <Alert
            action={
              <IconButton onClick={() => setIsAdded(false)}>
                <CloseIcon />{" "}
              </IconButton>
            }
            severity="success"
          >
            Drone Added Successfully
          </Alert>
        </Box>
      )}
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Add New Drone
      </Typography>
      <form onSubmit={handleBooking}>
        <TextField
          required
          size="small"
          name="name"
          onChange={handleOnChange}
          label="Drone Name"
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <TextField
          required
          variant="outlined"
          name="price"
          margin="dense"
          onChange={handleOnChange}
          size="small"
          fullWidth
          type="number"
          label="Drone Price"
        />

        <TextField
          required
          variant="outlined"
          label="Drone Image src"
          type="text"
          onChange={handleOnChange}
          size="small"
          name="img"
          fullWidth
        />
        <TextField
          required
          variant="outlined"
          type="text"
          size="small"
          margin="dense"
          multiline
          rows={3}
          onChange={handleOnChange}
          name="disc"
          fullWidth
          label="Description"
        />

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          type="submit"
          endIcon={<Add />}
        >
          Add Drone
        </Button>
      </form>
    </>
  );
};

export default AddDrone;
