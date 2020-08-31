import React from "react";
import {
  Stepper,
  Step,
  StepButton,
  StepLabel,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core";
import variables from "../../styles/_variables.scss";

const muiTheme = createMuiTheme({
  overrides: {
    MuiStepIcon: {
      root: {
        color: "white",
        border: "2px solid grey",
        borderRadius: "50px",

        "&$active": {
          color: "white",
          border: `2px solid ${variables.commonTheme}`,
          borderRadius: "50px",
        },
        "&$completed": {
          color: variables.commonTheme,
          border: `2px solid ${variables.commonTheme}`,
          "&$active": {
            color: variables.commonTheme,
            border: `2px solid ${variables.commonTheme}`,
            borderRadius: "50px",
          },
        },
      },
      text: {
        fill: variables.commonTheme,
      },
    },

    MuiStepLabel: {
      label: {
        color: "grey",
        "&$active": {
          color: variables.commonTheme,
        },
        "&$completed": {
          color: variables.commonTheme,
        },
      },
    },
    MuiStepConnector: {
      vertical: {
        padding: "0px",
      },
      lineVertical: {
        borderColor: variables.commonTheme,
        borderLeftWidth: "3px",
      },
      active: {
        "& $line": {
          borderColor: variables.commonTheme,
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
        nonLinear
      >
        {props.navigationList.map((label, index) => (
          <Step key={label}>
            <StepButton
              completed={props.completed[index]}
              onClick={() => props.handleStep(index)}
              disabled={
                (props.errors.name && props.errors.mailId) ||
                props.errors.name?true:false ||
                props.errors.mailId?true:false
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
