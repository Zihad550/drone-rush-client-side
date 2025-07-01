import Modal from "@/components/Shared/Modal";
import Spinner from "@/components/Shared/Spinner";
import { selectToken, selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
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
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ManageDrones = () => {
  // const [drones, setDrones] = useState<IProduct[] | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [noPermission, setNoPermission] = useState(false);
  // const { data } = useAPI(() =>
  //   ProductService.getAllProducts({ productsPerPage: 0 })
  // );
  const data = { products: [] };
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  useEffect(() => {
    setRefresh(false);
    const controller = new AbortController();
    /* (async () => {
      setDrones(await axiosInstance.get("/drones").then((res) => res.data));
    })(); */

    return () => {
      controller.abort();
    };
  }, [refresh]);

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
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure?")) {
      // ProductService.deleteProduct(id).then(res => console.log(res))
      axios
        .delete(`http://localhost:8000/product/${id}`, {
          headers: {
            Authorization: token,
          },
        })
        .then(({ data }) => {
          data.deletedCount > 0 && setRefresh(true);
          data.deletedCount > 0 && setIsDeleted(true);
          data.deletedCount === 0 && setNoPermission(true);
        });
    }
  };

  if (!data) return <Spinner />;

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
            {data.products.map((drone) => (
              <StyledTableRow key={drone._id}>
                <StyledTableCell sx={{ width: "100px" }} scope="row">
                  <img src={drone.img} style={{ width: "100px" }} />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {drone.name}
                </StyledTableCell>
                <StyledTableCell align="left">{drone.disc}</StyledTableCell>
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
