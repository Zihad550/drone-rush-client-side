import { Button, ButtonGroup, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ReviewModal = ({
  openReview,
  handleCloseReview,
  product,
  setReviewSuccess,
}) => {
  const { name, img } = product;
  const { user } = useAuth();

  const [reviewInfo, setReviewInfo] = useState({
    userName: user.displayName,
    email: user.email,
  });

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo = { ...reviewInfo };
    newInfo[field] = value;
    setReviewInfo(newInfo);
  };

  const handleReview = (e) => {
    e.preventDefault();
    // collect data
    const review = {
      ...reviewInfo,
      product: name,
      img,
    };

    // send to the server
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Review added successfully");
          handleCloseReview();
        }
      });
  };
  return (
    <Modal
      open={openReview}
      onClose={handleCloseReview}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {name}
        </Typography>
        <form onSubmit={handleReview}>
          <TextField
            placeholder="Review"
            multiline
            rows={3}
            onBlur={handleOnBlur}
            size="small"
            fullWidth
            label="Review"
            sx={{ m: 1 }}
            name="message"
          />
          <TextField
            placeholder="Rating"
            type="number"
            onBlur={handleOnBlur}
            InputProps={{ inputProps: { min: 0, max: 5 } }}
            size="small"
            fullWidth
            label="Rating"
            sx={{ m: 1 }}
            name="rating"
          />
          <TextField
            onBlur={handleOnBlur}
            defaultValue={user.displayName}
            size="small"
            name="userName"
            sx={{ width: "100%", m: 1 }}
            label="Name"
          />

          <TextField
            defaultValue={user.email}
            type="email"
            size="small"
            onBlur={handleOnBlur}
            label="Email"
            name="email"
            sx={{ width: "100%", m: 1 }}
          />

          <ButtonGroup
            type="submit"
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              boxShadow: 0,
            }}
          >
            <Button
              sx={{ backgroundColor: "error.main" }}
              onClick={handleCloseReview}
            >
              Close modal
            </Button>
            <Button type="submit">Send</Button>
          </ButtonGroup>
        </form>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
