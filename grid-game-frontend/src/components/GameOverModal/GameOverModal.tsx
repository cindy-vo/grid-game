import React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { GameActionTypes } from "../../utilities/types";
import { StyledDialogTitle, StyledDialog } from "../StyledDialog/StyledDialog";

const GameOverModal = (props: {
  state: any;
  initialState: any;
  dispatch: any;
}) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handlePlayAgain = () => {
    setOpen(false);
    props.dispatch({ type: GameActionTypes.RESTART_GAME });
  };

  return (
    <div>
      <StyledDialog onClose={handleClose} open={props.state.isGameOver && open}>
        <StyledDialogTitle onClose={handleClose}>
          {props.state.victorious
            ? "Congratulations! You've reached the retcon location!"
            : `${
                props.state.health <= 0
                  ? "You've sustained too much damage"
                  : "You didn't make it in time"
              }!`}
        </StyledDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {props.state.victorious
              ? ""
              : "Sucks to suck. You've failed your mission..."}
            Click the play again button below or refresh the page to play again.
            Clicking the X button just closes the window and frankly serves no
            useful purpose.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handlePlayAgain}>
            Play again?
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
};

export default GameOverModal;
