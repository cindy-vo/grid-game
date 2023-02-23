import Grid from "@mui/material/Grid";

const Board = ({ grids }: any) => {
  return (
    <Grid container spacing={0} columns={100}>
      {grids}
    </Grid>
  );
};

export default Board;
