import React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/Info";
import { StyledDialogTitle, StyledDialog } from "../StyledDialog/StyledDialog";

const IntroductionModal = () => {
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen} color="info">
        <InfoIcon />
      </IconButton>
      <StyledDialog onClose={handleClose} open={open}>
        <StyledDialogTitle onClose={handleClose}>
          Welcome to the Get To The Location Game!
        </StyledDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You're a scout who was given a mission to retcon with another
            squadron. You are trying to make it to the retcon location; however,
            there are many obstacles in your way and you only have a limited
            number of time ("moves") to get there.
          </Typography>
          <Typography gutterBottom>The Gist:</Typography>
          <Typography gutterBottom>
            You're a black cell that's trying to get to the bright magenta cell.
          </Typography>
          <Typography gutterBottom>
            You start off with 200 health and 450 moves.
          </Typography>
          <Typography gutterBottom>
            Win condition: Get to the designated location without losing all of
            your health or moves.
          </Typography>
          <Typography gutterBottom>
            Lose condition: You lose all of your health or moves.
          </Typography>
          <Typography gutterBottom>
            Specific cells that you traverse to can affect your health and
            moves:
          </Typography>
          <Typography gutterBottom>
            Red cells represent lava. You lose 50 health and 10 moves.
          </Typography>
          <Typography gutterBottom>
            Brown cells represent mud. You lose 10 health and 5 moves.
          </Typography>
          <Typography gutterBottom>
            Blue cells are somewhat helpful. You lose 5 health and 0 moves.
          </Typography>
          <Typography gutterBottom>
            White cells do not affect you much. You lose 0 health and 1 moves.
          </Typography>
          <Typography gutterBottom>Controls:</Typography>
          <Typography gutterBottom>
            Up arrow key allows you to move up.
          </Typography>
          <Typography gutterBottom>
            Down arrow key allows you to move down.
          </Typography>
          <Typography gutterBottom>
            Left arrow key allows you to move left.
          </Typography>
          <Typography gutterBottom>
            Right arrow key allows you to move right.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            I got it.
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default IntroductionModal;
