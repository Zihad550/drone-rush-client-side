import CloseIcon from "@mui/icons-material/Close";
import { Alert, IconButton, Box } from "@mui/material";
import React from "react";

interface ModalProps {
  message: string;
  severity: "error" | "success" | "warning" | "info";
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}
const Modal = ({ message, severity, setClose }: ModalProps) => (
  <Box sx={{ position: "fixed", top: "50%", left: "50%" }}>
    <Alert
      action={
        <IconButton onClick={() => setClose(false)}>
          <CloseIcon />
        </IconButton>
      }
      severity={severity}
    >
      {message}
    </Alert>
  </Box>
);

export default Modal;
