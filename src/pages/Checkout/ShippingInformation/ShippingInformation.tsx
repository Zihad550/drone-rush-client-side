import type IShippingInfo from "@/types/shippingInfo.type";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  type SelectChangeEvent,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import "./ShippingInformation.css";
const ShippingInformation = ({
  shippingInformations,
  setShippingInformations,
  userShippingInfos,
  selectedShippingId,
  onSelectShipping,
  onSaveShipping,
  onDeleteShipping,
  isNewShippingInfo,
  isEditing,
  setIsEditing,
  isLoading,
}: {
  shippingInformations: Partial<IShippingInfo>;
  setShippingInformations: React.Dispatch<
    React.SetStateAction<Partial<IShippingInfo>>
  >;
  userShippingInfos: IShippingInfo[];
  selectedShippingId: string | null;
  onSelectShipping: (id: string | null) => void;
  onSaveShipping: (data: Partial<IShippingInfo>) => Promise<void>;
  onDeleteShipping: (id: string) => Promise<void>;
  isNewShippingInfo: boolean;
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) => {
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [shippingToDelete, setShippingToDelete] = useState<string | null>(null);

  const { street, country, state, city, zipCode, apt } = shippingInformations;

  const handleInputData = (e: React.FocusEvent<HTMLInputElement> | any) => {
    const newInformations: any = { ...shippingInformations };
    newInformations[e.target.name] = e.target.value;
    setShippingInformations(newInformations);

    // Enable editing mode when user modifies a field
    if (!isNewShippingInfo && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    if (value === "new") {
      onSelectShipping(null);
    } else {
      onSelectShipping(value);
    }
  };

  const handleDeleteClick = (id: string) => {
    setShippingToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (shippingToDelete) {
      await onDeleteShipping(shippingToDelete);
      setDeleteConfirmOpen(false);
      setShippingToDelete(null);
    }
  };

  const handleSaveShippingInformation = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      await onSaveShipping(shippingInformations);
    } catch (error) {
      console.error("Error saving shipping information:", error);
    }
  };
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
        Shipping Information
      </Typography>

      {/* Shipping Information Selection */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth size="small">
          <InputLabel id="shipping-select-label">
            Select Shipping Address
          </InputLabel>
          <Select
            labelId="shipping-select-label"
            id="shipping-select"
            value={selectedShippingId || "new"}
            label="Select Shipping Address"
            onChange={handleSelectChange}
          >
            <MenuItem value="new">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AddIcon fontSize="small" sx={{ mr: 1 }} />
                Add New Address
              </Box>
            </MenuItem>
            {userShippingInfos.map((info) => (
              <MenuItem key={info._id} value={info._id}>
                {info.street}, {info.city}, {info.state}, {info.country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Shipping Address Actions */}
      {!isNewShippingInfo && selectedShippingId && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Tooltip title={isEditing ? "Currently editing" : "Edit address"}>
            <span>
              <IconButton
                color={isEditing ? "primary" : "default"}
                onClick={() => setIsEditing(true)}
                disabled={isEditing}
              >
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Delete address">
            <IconButton
              color="error"
              onClick={() => handleDeleteClick(selectedShippingId)}
              disabled={isLoading}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <form onSubmit={handleSaveShippingInformation}>
        <Typography sx={{ mb: 1 }} variant="h6">
          Address
        </Typography>

        <Box>
          <Box sx={{ display: "flex" }}>
            <TextField
              required
              type="text"
              label="Street, house/apartment/unit"
              name="street"
              size="small"
              sx={{ width: "100%" }}
              onBlur={handleInputData}
              onChange={handleInputData}
              value={street}
            />
            <TextField
              size="small"
              type="text"
              label="Apt, Suite, Unit, etc. (Optional)"
              name="apt"
              onBlur={handleInputData}
              sx={{ width: "100%", ml: 3 }}
              onChange={handleInputData}
              value={apt}
            />
          </Box>
          <Box sx={{ display: "flex", mt: 1 }}>
            <TextField
              required
              type="text"
              label="Country"
              name="country"
              size="small"
              sx={{ width: "100%" }}
              onBlur={handleInputData}
              onChange={handleInputData}
              value={country}
            />
            <TextField
              required
              type="text"
              label="State/Province/Region"
              name="state"
              size="small"
              sx={{ width: "100%", ml: 3 }}
              onBlur={handleInputData}
              onChange={handleInputData}
              value={state}
            />
            <TextField
              required
              type="text"
              label="City"
              name="city"
              size="small"
              sx={{ width: "100%", ml: 3 }}
              onBlur={handleInputData}
              onChange={handleInputData}
              value={city}
            />
            <TextField
              required
              type="number"
              label="Zip Code"
              name="zipCode"
              size="small"
              sx={{ width: "100%", ml: 3 }}
              onBlur={handleInputData}
              onChange={handleInputData}
              value={zipCode}
            />
          </Box>
        </Box>

        {/* submit button */}
        <Button
          disabled={isLoading || (!isNewShippingInfo && !isEditing)}
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 1.5 }}
        >
          {isNewShippingInfo
            ? "Save New Address"
            : isEditing
              ? "Update Address"
              : "Save Information"}
        </Button>

        {isEditing && (
          <Button
            variant="outlined"
            sx={{ mt: 1.5, ml: 2 }}
            onClick={() => {
              setIsEditing(false);
              onSelectShipping(selectedShippingId);
            }}
          >
            Cancel Editing
          </Button>
        )}
      </form>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this shipping address? This action
          cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ShippingInformation;
