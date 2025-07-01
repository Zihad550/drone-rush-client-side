import { LinearProgress, Rating, Typography } from "@mui/material";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import React from "react";

const RatingBar = ({
  value,
  total,
  average,
}: {
  value: number;
  total: number;
  average: number;
}) => {
  const RatingLinearBar = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
      borderRadius: 0,
      width: "200px",
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: "gold",
      borderRadius: 0,
    },
  }));
  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
      <Rating value={value} size="small" readOnly />
      <RatingLinearBar
        sx={{ background: "gold", color: "gold", mx: 2 }}
        variant="determinate"
        value={average}
      />
      <Typography variant="body2">{total}</Typography>
    </Box>
  );
};

export default RatingBar;
