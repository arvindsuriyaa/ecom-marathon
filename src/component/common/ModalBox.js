import React from "react";
import { Modal, Fade, Button, makeStyles, Backdrop } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalBox = (props) => {
  const modalClass = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={modalClass.modal}
      open={props.open}
      onClose={props.onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <div className={modalClass.paper}>
          <h2 id="transition-modal-title">
            Toggling will lead to loss of data. want to proceed?
          </h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              style={{
                backgroundColor: "grey",
                color: "white",
              }}
              onClick={props.onClose}
            >
              No
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={props.handleToggle}
            >
              Yes
            </Button>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalBox;
