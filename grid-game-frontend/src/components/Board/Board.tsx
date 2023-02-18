import React from "react";
import { Grid } from "@mui/material";

const Board = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={1}></Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={1}></Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Board;
