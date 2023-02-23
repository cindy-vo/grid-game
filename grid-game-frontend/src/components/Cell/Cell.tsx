import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

const Cell = styled(Paper)(({ theme, color }) => ({
  backgroundColor: color,
  padding: theme.spacing(1),
}));

export default Cell;
