import React from "react";
import { Stepper, Step, StepButton, StepLabel } from "@material-ui/core";

const StepperBox = (props) => {
  const {  activeStep } = props;
  return (
    <Stepper
      className={props.className}
      activeStep={activeStep}
      orientation="vertical"
      connector={props.connector}
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
  );
};

export default StepperBox;
