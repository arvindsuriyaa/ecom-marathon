/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
import React, { useState, useEffect } from "react";
import { Container, BottomNavigation, Button, Box } from "@material-ui/core";
import { navigationList, routePath, defaultState } from "../utils/productSeed";
import { formStyles } from "../styles/FormStyles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import { bindDispatch } from "../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import StepperBox from "./common/StepperBox";
import Footer from "./common/Footer";
import CircularProgress from "@material-ui/core/CircularProgress";
import _ from "lodash";
import DialogBox from "../component/common/DialogBox";
import { updateUser } from "../utils/api/putApi";
import * as apiData from "../utils/api/getAPI";
import * as post from "../utils/api/postApi";
import * as Root from "../utils/RootDirectory";
import { withRouter } from "react-router-dom";

const Form = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const { actions, reducer } = props;
  const { setDetail, checkEmptyField } = actions;
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
  let validationCount = 0;
  let state = _.cloneDeep(defaultState);
  const [seed, setSeed] = useState({});
  const [status, setStatus] = useState(<CircularProgress size={70} />);

  useEffect(() => {
    let steps = [0, 1, 2];
    let newCompleted = { ...isCompleted };
    steps.map((step) => {
      async function checkStep(step) {
        let formData = setDetail(step, formDetails, completed);
        let data = Object.entries(formData);
        let emptyFieldCount = checkEmptyField(data, formData, validationCount);
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
      }
      checkStep(step);
    });
    fetchApi();
    history.push("/Form/PersonalDetails");
  }, []);

  const fetchApi = async () => {
    let getData = await apiData.getAll();
    if (Array.isArray(getData)) {
      let personalDetailsAPI = {},
        addressDetailsAPI = {},
        qualificationAPI = {};
      personalDetailsAPI.gender = getData[3].data;
      personalDetailsAPI.language = getData[8].data;
      personalDetailsAPI.knowProduct = getData[2].data;
      addressDetailsAPI.addressType = getData[0].data;
      addressDetailsAPI.state = getData[5].data;
      qualificationAPI.annualSalary = getData[1].data;
      qualificationAPI.level = getData[4].data;
      qualificationAPI.state = getData[5].data;
      qualificationAPI.qualification = getData[6].data;
      qualificationAPI.userRoles = getData[7].data;
      assignSeed("personalDetailsAPI", personalDetailsAPI);
      assignSeed("addressDetailsAPI", addressDetailsAPI);
      assignSeed("qualificationAPI", qualificationAPI);
    } else {
      if (getData.request.status === 0) {
        setStatus(<DialogBox />);
      }
    }
  };
  const assignSeed = (name, value) => {
    seed[name] = value;
    setSeed({ seed: { ...seed } });
  };
  const cancel = () => {
    const newCompleted = completed;
    newCompleted[0] = false;
    setCompleted(newCompleted);
    actions.editData("reducer", state);
    actions.assignData("isEdit", false);
  };

  const save = async () => {
    const { reducer, actions } = props;
    const { errorValidation } = actions;
    let allUsers = await apiData.getAllUsers();
    errorValidation(allUsers.data);
    if (!errors.name && !errors.mailId) {
      const { isEdit } = reducer;
      if (isEdit) {
        let res = await apiData.getUsersById(personalDetails.id);
        let editInfo = res.data;
        personalDetails.token = editInfo.token;
        personalDetails.isDeleted = editInfo.isDeleted;
        let updateResponse = await updateUser(personalDetails.id, {
          personalDetails,
          addressDetails,
          qualificationDetails,
        });
        actions.assignData("isEdit", false);
      } else {
        let details = { personalDetails, qualificationDetails, addressDetails };
        let res = await post.postAPI(details);
      }
      actions.editData("reducer", state);
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
    let emptyFieldCount = checkEmptyField(data, formData, validationCount);
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
      if (location.pathname === Root.PERSONAL_DETAILS) {
        handleStep(0);
      } else if (location.pathname === Root.ADDRESS_DETAILS) {
        handleStep(1);
      } else if (location.pathname === Root.PROFESSIONAL_DETAILS) {
        handleStep(2);
      }
    }
  }, [history.action]);

  return !Object.entries(seed).length ? (
    <div className={classes.progress}>{status}</div>
  ) : (
    <div id="wrapper">
      <Container className={classes.container}>
        <header style={{ padding: "15px 12px" }}>
          <Button
            className={classes.button}
            onClick={
              !activeStep
                ? () => {
                    history.push(Root.TABLE);
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
          {props.children(seed)}
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

export default connect(mapStateToProps, bindDispatch)(withRouter(Form));
