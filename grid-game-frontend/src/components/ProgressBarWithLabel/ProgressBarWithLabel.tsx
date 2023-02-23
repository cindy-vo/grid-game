import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

const ProgressBarWithLabel = (
  props: LinearProgressProps & {
    value: number;
    fullValue: number;
    type: string;
  }
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ minWidth: 100 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${props.type}: ${props.fullValue}`}</Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
};

export default ProgressBarWithLabel;
