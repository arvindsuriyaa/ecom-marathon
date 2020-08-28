import React, { useState, useEffect } from "react";
import { Container, BottomNavigation, Button, Box } from "@material-ui/core";
import { navigationList, routePath } from "../../constants/constants";
import { formStyles } from "../../styles/FormStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { bindDispatch } from "../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import StepperBox from "../common/StepperBox";
import Footer from "../common/Footer";
import * as fetchApi from "../../api/apiAction";
import * as Root from "../../constants/path";
import { withRouter } from "react-router-dom";

const License = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { actions, reducer } = props;
  const { setDetail, checkField } = actions;
  const {
    personalDetails,
    errors,
    isCompleted,
    qualificationDetails,
    addressDetails,
  } = reducer;
  const classes = formStyles();
  const history = useHistory();
  let formDetails = {};

  const checkStepper = async (step, newCompleted) => {
    let formData = setDetail(step, formDetails, completed);
    let data = Object.entries(formData);
    let emptyFieldCount = checkField(data);
    if (
      emptyFieldCount <= Object.keys(formData).length &&
      emptyFieldCount > 0
    ) {
      newCompleted[step] = false;
    }
    if (emptyFieldCount === 0) {
      newCompleted[step] = true;
    }
    await actions.assignData("isCompleted", newCompleted);
  };

  const assignStepper = () => {
    let steps = [0, 1, 2];
    let newCompleted = { ...isCompleted };
    steps.map((step) => {
      return checkStepper(step, newCompleted);
    });
    history.push("/Form/PersonalDetails");
  };

  useEffect(assignStepper, []);

  const cancel = () => {
    const newCompleted = completed;
    newCompleted[0] = false;
    setCompleted(newCompleted);
    actions.resetForm();
    actions.assignData("isEdit", false);
  };

  const save = async () => {
    const { reducer, actions } = props;
    const { checkMandatoryField, checkDuplication } = actions;
    let allUsers = await fetchApi.getAllUsers();
    checkMandatoryField();
    checkDuplication(allUsers.data);
    if (!errors.name && !errors.mailId) {
      const { isEdit } = reducer;
      if (isEdit) {
        let res = await fetchApi.getUsersById(personalDetails.id);
        let editInfo = res.data;
        personalDetails.token = editInfo.token;
        personalDetails.isDeleted = editInfo.isDeleted;
        await fetchApi.updateUser(personalDetails.id, {
          personalDetails,
          addressDetails,
          qualificationDetails,
        });
        actions.assignData("isEdit", false);
      } else {
        let details = { personalDetails, qualificationDetails, addressDetails };
        await fetchApi.postAPI(details);
      }
      actions.resetForm();
      history.push(Root.TABLE);
    } else {
      handleStep(activeStep - 2);
      history.push(routePath[0]);
    }
  };

  const handleNext = async (activeStep) => {
    if (!activeStep) {
      if (!personalDetails.name) {
        errors.name = true;
      }
      if (!personalDetails.mailId) {
        errors.mailId = true;
      }
    }
    (async () => {
      await actions.assignData("errors", { ...errors });
    })();
    if (!errors.name && !errors.mailId) {
      handleStep(activeStep + 1);
    }
    if (!(errors.name && errors.mailId)) {
      return false;
    }
    return true;
  };

  const handleBack = (activeStep) => {
    handleStep(activeStep - 1);
  };

  const handleStep = async (step) => {
    setActiveStep(step);
    const { isCompleted } = reducer;
    let newCompleted = { ...isCompleted };
    let formData = setDetail(activeStep, formDetails, completed);
    formDetails = formData;
    let data = Object.entries(formData);
    let emptyFieldCount = checkField(data);
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

  const handleRoute = () => {
    const { history, location } = props;
    const { action } = history;
    if (action === "POP") {
      if (location.pathname === Root.PERSONAL_DETAILS) {
        handleStep(0);
      } else if (location.pathname === Root.ADDRESS_DETAILS) {
        handleStep(1);
      } else if (location.pathname === Root.PROFESSIONAL_DETAILS) {
        handleStep(2);
      }
    }
  };

  useEffect(handleRoute, [history.action]);

  return (
    <div id="wrapper">
      <Container className={classes.container}>
        <header style={{ padding: "15px 12px" }}>
          <Button
            className={classes.button}
            onClick={
              !activeStep
                ? () => {
                    cancel();
                    history.push(Root.TABLE);
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
            isEdit={reducer.isEdit}
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

export default connect(mapStateToProps, bindDispatch)(withRouter(License));
