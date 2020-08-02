import React from "react";
import { Container, Button } from "@material-ui/core";

const Footer = (props) => {
  return (
    <Container className="form">
      <Button
        variant="contained"
        color="primary"
        onClick={
          !props.activeStep
            ? () => props.cancel()
            : () => props.handleBack(props.activeStep)
        }
      >
        {!props.activeStep ? "cancel" : "back"}
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={
          props.activeStep === props.routePath.length - 1
            ? () => props.save()
            : props.activeStep < props.routePath.length - 1
            ? () => props.handleNext(props.activeStep)
            : () => props.save()
        }
      >
        {props.activeStep === props.routePath.length - 1
          ? "Save"
          : props.activeStep < props.routePath.length - 1
          ? "Next"
          : "Save"}
      </Button>
    </Container>
  );
};

export default Footer;
