import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

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
    props.dispatch({ type: "RESTART_GAME" });
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        open={props.state.isGameOver && open}
      >
        <BootstrapDialogTitle onClose={handleClose}>
          {props.state.victorious
            ? "Congratulations! You've reached the retcon location!"
            : `${
                props.state.health <= 0
                  ? "You sustained too much damage. You didn't make it to the retcon location"
                  : "moves"
              }!`}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {props.state.victorious
              ? ""
              : "Sucks to suck. You've let down your squadron."}
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
      </BootstrapDialog>
    </div>
  );
};

export default GameOverModal;
