import Spinner from '@/components/Shared/Spinner';
import AppSelect from '@/components/ui/AppSelect';
import { useUpdateOrderStatusMutation } from '@/redux/features/order/orderApi';
import type { IOption, TOrderStatus } from '@/types';
import { TextField, type SelectChangeEvent } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, type ChangeEventHandler } from 'react';
import { toast } from 'sonner';

const UpdateOrderStatusModal = ({
  orderStatusOptions,
  id,
  status,
}: {
  orderStatusOptions: IOption[];
  id: string;
  status: TOrderStatus;
}) => {
  const [updateStatus, { isLoading }] = useUpdateOrderStatusMutation();
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<{
    status: TOrderStatus;
    cancelReason: '';
  }>({
    status: status,
    cancelReason: '',
  });
  const handleOnChange: (event: SelectChangeEvent) => void = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value as any,
    });
  };

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleConfirm = async () => {
    const toastId = toast.loading('Updating status');

    try {
      console.log(id);
      const res = await updateStatus({ payload: values, id }).unwrap();

      if (res.success) {
        toast.success('Status updated successfully', { id: toastId });
        setOpen(false);
      }
    } catch (err) {
      if (err?.data?.message) toast.error(err.data.message, { id: toastId });
      else toast.error('Failed to update status', { id: toastId });
    }
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update status{' '}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <AppSelect
            sx={{ mt: 1 }}
            options={orderStatusOptions}
            name="status"
            label="Status"
            handleChange={handleOnChange}
            defaultValue={status}
          />
          <TextField
            disabled={values.status !== 'admin-cancelled'}
            sx={{ mt: 2 }}
            required
            variant="outlined"
            type="text"
            size="small"
            margin="dense"
            multiline
            rows={3}
            onChange={handleOnChange as ChangeEventHandler}
            name="cancelReason"
            fullWidth
            label="Cancel reason"
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleConfirm}>
            Confirm
          </Button>
          <Button onClick={handleClose} color="error">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateOrderStatusModal;
