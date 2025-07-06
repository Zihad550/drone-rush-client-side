import Modal from "@/components/Shared/Modal";
import Spinner from "@/components/Shared/Spinner";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "@/redux/features/product/productApi";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Box, IconButton, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import { toast } from "sonner";

const ManageDrones = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [noPermission, setNoPermission] = useState(false);
  const { data, isLoading } = useGetProductsQuery(undefined);
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  // handle delete drone
  const handleDelete = async (id: string) => {
    const confirmation = window.confirm("Are you sure?");
    if (!confirmation) return;
    const toastId = toast.loading("Deleting...");
    try {
      const res = await deleteProduct(id).unwrap();
      if (res.success) {
        toast.success("Drone deleted successfully", { id: toastId });
      }
    } catch (err: any) {
      if (err?.data?.message) toast.error(err.data.message, { id: toastId });
      else toast.error("An error occurred", { id: toastId });
    }
  };

  if (isLoading || isDeleting) return <Spinner />;
  if (!data?.data?.length) return <div>No products available</div>;

  return (
    <>
      {/* modal */}
      {isDeleted && (
        <Modal
          message="Drone deleted successfully"
          severity="success"
          setClose={setIsDeleted}
        />
      )}
      {noPermission && (
        <Box
          sx={{ position: "fixed", top: "50%", left: "40%", width: "300px" }}
        >
          <Alert
            action={
              <IconButton onClick={() => setNoPermission(false)}>
                <CloseIcon />{" "}
              </IconButton>
            }
            severity="error"
          >
            You Don't have permission to delete the existing one. Please create
            a new one to perform this action.
          </Alert>
        </Box>
      )}
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Manage Drones
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Image</StyledTableCell>
              <StyledTableCell>Drone Name</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="left">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((drone) => (
              <StyledTableRow key={drone._id}>
                <StyledTableCell sx={{ width: "100px" }} scope="row">
                  <img src={drone.img} style={{ width: "100px" }} />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {drone.name}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {drone.description}
                </StyledTableCell>
                <StyledTableCell
                  sx={{ width: "100px" }}
                  align="left"
                >{`$ ${drone.price}`}</StyledTableCell>
                <StyledTableCell align="center">
                  <IconButton
                    title="Delete Drone"
                    onClick={() => handleDelete(drone._id)}
                  >
                    <CancelIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ManageDrones;
