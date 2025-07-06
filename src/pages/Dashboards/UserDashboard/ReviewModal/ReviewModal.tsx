import { Button, ButtonGroup, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/store';
import { toast } from 'sonner';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

//  review modal types
type ReviewModalProps = {
  openReview: true | false;
  handleCloseReview: () => void;
  product: {
    productName: string;
    img: string;
  };
};

const ReviewModal = ({
  openReview,
  handleCloseReview,
  product,
}: ReviewModalProps) => {
  const { productName, img } = product;
  const { data: user } = useSelector((state: AppState) => state.auth);

  const [reviewInfo, setReviewInfo] = useState({
    userName: user?.name,
    email: user?.email,
  });

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newInfo: any = { ...reviewInfo };
    newInfo[field] = value;
    setReviewInfo(newInfo);
  };

  const handleReview: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Submitting review...');
    try {
      // collect data
      const review = {
        ...reviewInfo,
        productName,
        img,
      };

      // send to the server
      /* axiosInstance.post("/reviews", { review }).then(({ data }) => {
        if (data.insertedId) {
          alert("Review added successfully");
          handleCloseReview();
        }
      }); */
      toast.success('Review submitted!', { id: toastId });
    } catch (err) {
      if (err?.data?.message) toast.error(err.data.message, { id: toastId });
      else toast.error('Something went wrong', { id: toastId });
    }
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
          {productName}
        </Typography>
        <form onSubmit={handleReview}>
          <TextField
            placeholder="Review"
            multiline
            rows={3}
            onChange={handleOnChange}
            size="small"
            fullWidth
            label="Review"
            name="message"
          />
          <TextField
            required
            type="number"
            onChange={handleOnChange}
            InputProps={{ inputProps: { min: 0, max: 5 } }}
            size="small"
            fullWidth
            label="Rating"
            name="rating"
            margin="dense"
          />
          <TextField
            required
            onChange={handleOnChange}
            defaultValue={user?.name}
            size="small"
            name="userName"
            label="Name"
            fullWidth
            margin="dense"
          />

          <TextField
            required
            defaultValue={user?.email}
            type="email"
            size="small"
            onChange={handleOnChange}
            label="Email"
            name="email"
            fullWidth
            margin="dense"
          />

          <ButtonGroup
            variant="contained"
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              boxShadow: 0,
            }}
          >
            <Button
              sx={{ backgroundColor: 'error.main' }}
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
