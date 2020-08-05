/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { Container, BottomNavigation, Button, Box } from "@material-ui/core";
import { navigationList, routePath } from "../utils/productSeed";
import { formStyles } from "../styles/FormStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import StepperBox from "./common/StepperBox";
import Footer from "./common/Footer";
import { defaultState } from "../utils/productSeed";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import "../styles/stepper.scss";

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
  let state = _.cloneDeep(defaultState);

  useEffect(() => {
    history.push("/Form/PersonalDetails");
  }, []);

  const cancel = () => {
    const newCompleted = completed;
    newCompleted[0] = false;
    setCompleted(newCompleted);
    actions.editData("reducer", state);
    actions.assignData("isEdit", false);
  };

  const save = async () => {
    const { reducer, actions } = props;
    const { userHistory, isEdit } = reducer;
    if (!personalDetails.userName) {
      errors.userName = true;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!reg.test(personalDetails.email)) {
      errors.email = true;
    }
    userHistory.map((item) => {
      if (item.personalDetails.email === personalDetails.email && !isEdit) {
        errors.email = true;
      }
    });
    (async () => {
      await actions.assignData("errors", { ...errors });
    })();
    if (!errors.userName && !errors.email) {
      const { userHistory, isEdit, id } = reducer;
      if (isEdit) {
        let spliceIndex = 0;
        userHistory.map((user, index) => {
          if (user.id === id) {
            spliceIndex = index;
          }
        });
        userHistory.splice(spliceIndex, 1, { ...reducer });
        actions.assignData("userHistory", userHistory);
        actions.assignData("isEdit", false);
      } else {
        reducer["id"] = userHistory.length + 1;
        userHistory.push(reducer);
      }
      actions.editData("reducer", state);
      history.push("/Table");
    } else {
      handleStep(activeStep - 2);
      history.push(routePath[0]);
    }
  };

  const handleNext = async (activeStep) => {
    if (!activeStep) {
      if (!personalDetails.userName) {
        errors.userName = true;
      }
      if (!personalDetails.email) {
        errors.email = true;
      }
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
    await actions.assignData("isCompleted", newCompleted);
    history.push(routePath[step]);
  };

  useEffect(() => {
    const { history, location } = props;
    const { action } = history;
    if (action === "POP") {
      if (location.pathname === "/Form/PersonalDetails") {
        handleStep(0);
      } else if (location.pathname === "/Form/AddressDetails") {
        handleStep(1);
      } else if (location.pathname === "/Form/ProfessionalDetails") {
        handleStep(2);
      }
    }
  }, [history.action]);

  return (
    <div id="wrapper">
      <Container className={classes.container}>
        <header style={{ padding: "15px 12px" }}>
          <Button
            className={classes.button}
            onClick={
              !activeStep
                ? () => {
                    history.push("/Table");
                    cancel();
                  }
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

export default connect(mapStateToProps, bindDispatch)(withRouter(Form));
