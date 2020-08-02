/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
// import Header from "./Header";
import {
  Container,
  BottomNavigation,
  Button,
  Box,
  StepButton,
} from "@material-ui/core";
import { navigationList, routePath } from "../utils/productSeed";
import { formStyles, QontoConnector } from "../styles/FormStyles";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import StepperBox from "./common/StepperBox";
import Footer from "./common/Footer";

const Form = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { actions, reducer } = props;
  const { setDetail, checkEmptyField } = actions;
  const { personalDetails, errors, isCompleted } = reducer;
  const classes = formStyles();
  const history = useHistory();
  let formDetails = {};
  let validationCount = 0;

  useEffect(() => {
    history.push(routePath[0]);
  }, []);

  const cancel = () => {
    alert("cancel");
    const newCompleted = completed;
    newCompleted[0] = false;
    setCompleted(newCompleted);
    console.log(completed);
  };

  const save = () => {
    if (!personalDetails.userName) {
      errors.userName = true;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(personalDetails.email)) {
      errors.email = true;
    }
    (async () => {
      await actions.assignData("errors", { ...errors });
    })();
    if (!errors.userName && !errors.email) {
      alert("save");
      history.push("/Table");
    } else {
      handleStep(activeStep - 2);
      history.push(routePath[0]);
    }
  };

  const handleNext = async (activeStep) => {
    // debugger;
    if (!personalDetails.userName) {
      errors.userName = true;
    }
    if (!personalDetails.email) {
      errors.email = true;
    }
    (async () => {
      await actions.assignData("errors", { ...errors });
    })();
    if (!errors.userName && !errors.email) {
      handleStep(activeStep + 1);
    }
    if (!(errors.userName && errors.email)) {
      return false;
    }
    return true;
  };

  const handleBack = (activeStep) => {
    handleStep(activeStep - 1);
  };

  const handleStep = async (step) => {
    debugger;
    setActiveStep(step);
    let newCompleted = { ...isCompleted };
    let formData = await setDetail(activeStep, formDetails, completed);
    formDetails = formData;
    let data = Object.entries(formData);
    let emptyFieldCount = await checkEmptyField(
      data,
      formData,
      validationCount
    );
    if (
      emptyFieldCount <= Object.keys(formData).length &&
      emptyFieldCount > 0
    ) {
      newCompleted[activeStep] = false;
    }
    if (emptyFieldCount === 0) {
      newCompleted[activeStep] = true;
    }
    reducer["isCompleted"] = newCompleted;
    await actions.assignData("reducer", reducer);
    history.push(routePath[step]);
  };

  return (
    <div id="wrapper">
      <Container className={classes.container}>
        <header style={{ padding: "15px 12px" }}>
          <Button
            onClick={
              !activeStep
                ? () => history.push("/Table")
                : () => handleBack(activeStep)
            }
          >
            <ArrowBackIcon />
            Individual List
          </Button>
        </header>
        <Box className={classes.root}>
          <StepperBox
            className={classes.stepper}
            activeStep={activeStep}
            connector={<QontoConnector />}
            navigationList={navigationList}
            completed={isCompleted}
            handleStep={handleStep}
            errors={errors}
          />

          {props.children}
        </Box>
        <BottomNavigation className={classes.footerAlign}>
          <Footer
            activeStep={activeStep}
            cancel={cancel}
            handleBack={handleBack}
            routePath={routePath}
            handleNext={handleNext}
            save={save}
          />
        </BottomNavigation>
      </Container>
    </div>
  );
};
const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(Form);
