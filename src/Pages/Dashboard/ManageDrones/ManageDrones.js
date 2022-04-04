import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, Typography } from "@mui/material";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";

const ManageDrones = () => {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    fetch("https://still-castle-43681.herokuapp.com/drones")
      .then((res) => res.json())
      .then((data) => setDrones(data));
  }, []);

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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));  

  // handle delete drone
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`https://still-castle-43681.herokuapp.com/drones?id=${id}`, {
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
    <>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 500 }}>
        Manage Drones
      </Typography>
     

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Image</StyledTableCell>
            <StyledTableCell>Drone Name</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell align="left" >Price</StyledTableCell>
            <StyledTableCell align="left">Actions</StyledTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {drones.map((drone) => (
            <StyledTableRow key={drone._id}>
              <StyledTableCell sx={{width: '100px'}} component="img" src={drone.img} scope="row" />
              <StyledTableCell component="th" scope="row">
                {drone.name}
              </StyledTableCell>
              <StyledTableCell align="left">{drone.disc}</StyledTableCell>
              <StyledTableCell sx={{width: '100px'}} align="left">{`$ ${drone.price}`}</StyledTableCell>
              <StyledTableCell   align="center" ><IconButton title="Delete Drone" onClick={() => handleDelete(drone._id)}><CancelIcon/></IconButton></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
};

export default ManageDrones;
