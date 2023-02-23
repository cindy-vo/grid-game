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
import InfoIcon from "@mui/icons-material/Info";

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
      <IconButton onClick={handleClickOpen}>
        <InfoIcon />
      </IconButton>
      <BootstrapDialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle onClose={handleClose}>
          Welcome to the Get To The Fucking Location Game!
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            You're a scout who was given a mission to retcon with another
            squadron. Your goal is to make it there in one piece. However, there
            are many obstacles in your way. You're a purple circle that's trying
            to make it to the black circle.
          </Typography>
          <Typography gutterBottom>
            Red squares represent lava. You lose 50 health and 10 moves.
          </Typography>
          <Typography gutterBottom>
            Brown squares represent mud. You lose 10 health and 5 moves.
          </Typography>
          <Typography gutterBottom>
            Blue squares are somewhat helpful. You lose 5 health and 0 moves.
          </Typography>
          <Typography gutterBottom>
            White squares do not affect you much. You lose 0 health and 1 moves.
          </Typography>
          <Typography gutterBottom>
            White squares do not affect you much. You lose 0 health and 1 moves.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            I got it.
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default IntroductionModal;
