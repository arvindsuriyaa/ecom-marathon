import React from "react";
import {
  Stepper,
  Step,
  StepButton,
  StepLabel,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";

const muiTheme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        color: "white", // or 'rgba(0, 0, 0, 1)'
        border: "2px solid grey",
        borderRadius: "50px",

        "&$active": {
          color: "white",
          border: "2px solid blue",
          borderRadius: "50px",
        },
        "&$completed": {
          // color: "blue",
          border: "2px solid #3f51b5",
          "&$active": {
            color: "blue",
            border: "2px solid blue",
            borderRadius: "50px",
          },
        },
      },
      text: {
        // Some CSS
        fill: "blue",
      },
    },

    MuiStepLabel: {
      label: {
        color: "grey", // or 'rgba(0, 0, 0, 1)'
        "&$active": {
          color: "blue",
        },
        "&$completed": {
          color: "blue",
        },
      },
    },
    MuiStepConnector: {
      vertical: {
        padding: "0px",
      },
      lineVertical: {
        borderColor: "blue",
        borderLeftWidth: "3px",
      },
      active: {
        "& $line": {
          borderColor: "blue",
        },
      },
      completed: {
        "& $line": {
          borderColor: "black",
        },
      },
    },
  },
});

const StepperBox = (props) => {
  const { activeStep } = props;
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Stepper
        className={props.className}
        activeStep={activeStep}
        orientation="vertical"
        // connector={props.connector}
        nonLinear
      >
        {props.navigationList.map((label, index) => (
          <Step key={label}>
            <StepButton
              completed={props.completed[index]}
              onClick={() => props.handleStep(index)}
              disabled={
                (props.errors.userName && props.errors.email) ||
                props.errors.userName ||
                props.errors.email
              }
            >
              <StepLabel>{label}</StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </MuiThemeProvider>
  );
};

export default StepperBox;
