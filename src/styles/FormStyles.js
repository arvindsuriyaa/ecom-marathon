import { makeStyles, withStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

export const formStyles = makeStyles({
  container: {
    height: "830px",
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  root: {
    display: "flex",
    height: "auto",
    justifyContent: "space-between",
  },
  stepper: {
    background: "rgb(241,241,241)",
    height: "130px",
  },
  footerAlign: {
    position: "fixed",
    width: "100%",
    bottom: "0",
    left: "0",
    zIndex: 1,
    "& .form": {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      "& Button": {
        margin: "0 10px",
      },
    },
  },
  button: {
    textTransform: "none",
    fontSize: "20px",
  },
});

export const CustomAutocomplete = withStyles({
  tag: {
    backgroundColor: "#C1B8B8",
    height: 25,
    position: "relative",
    zIndex: 0,
    "& .MuiChip-label": {
      color: "black",
    },
    "& .MuiChip-deleteIcon": {
      color: "#9A9393",
      position: "relative",
      left: 8,
      height: 20,
      width: 39,
    },
    "&:after": {
      content: '""',
      right: 10,
      top: 8,
      height: 10,
      width: 12,
      position: "absolute",
      backgroundColor: "white",
      zIndex: -1,
    },
  },
})(Autocomplete);

export const personalStyle = makeStyles((theme) => ({
  radio: {
    "&$checked": {
      color: "#000000ad",
    },
  },
  progress: {
    height: "50vh",
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checked: {},
  userRoot: {
    background: "rgb(241,241,241)",
    height: "auto",
    width: "80%",
  },
  grid: {
    padding: "25px 50px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },
  alignRadio: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  alignCenter: {
    alignSelf: "center",
  },
  Typography: {
    fontSize: "24px",
    color: "#000000ad",
  },
  show: {
    display: "block",
  },
  hide: {
    display: "none",
  },
}));

export const communicationStyle = makeStyles({
  addressRoot: {
    background: "rgb(241,241,241)",
    height: "auto",
    width: "80%",
  },
  progress: {
    height: "50vh",
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  grid: {
    padding: "0px 50px",
  },
  title: {
    fontSize: 20,
    padding: "20px 50px",
  },
  content: {
    fontSize: 15,
    padding: "20px 50px",
  },
});

export const professionStyle = makeStyles({
  root: {
    // background:'rgb(241,241,241)',
    height: "95%",
    width: "80%",
  },
  progress: {
    height: "50vh",
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  radioRoute: {
    background: "rgb(241,241,241)",
    height: "130px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: "35px",
  },
  alignRadio: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export const studentForm = makeStyles({
  root: {
    height: "auto",
    background: "rgb(241,241,241)",
  },
  grid: {
    padding: "25px 50px",
  },
});
export const professionalForm = makeStyles({
  root: {
    height: "auto",
    background: "rgb(241,241,241)",
  },
  grid: {
    padding: "25px 50px",
  },
});

export const HouseWifeForm = makeStyles({
  root: {
    height: "200px",
    background: "rgb(241,241,241)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 25,
  },
  grid: {
    padding: "25px 50px",
  },
});
