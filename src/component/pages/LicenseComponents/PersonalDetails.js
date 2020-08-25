/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  FormLabel,
  RadioGroup,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import InputField from "../../common/InputField";
import { createSelector } from "reselect";
import { bindDispatch } from "../../../utils";
import { connect } from "react-redux";
import { CustomAutocomplete, personalStyle } from "../../../styles/FormStyles";
import DateField from "../../common/DateField";
import RadioButton from "../../common/RadioButton";
import SelectField from "../../common/SelectField";
import DialogBox from "../../common/DialogBox";
import * as fetchApi from "../../../api/apiAction";
import CheckBoxField from "../../common/CheckBoxField";

const PersonalDetails = (props) => {
  const classes = personalStyle();
  const { actions, reducer } = props;
  const { handleData, handleCheckbox, stepperCheck } = actions;
  const { personalDetails, errors, emailCheck } = reducer;
  const [apiData, setApiData] = useState([]);
  const [status, setStatus] = useState(<CircularProgress size={70} />);
  let index = 0;
  let detail = "personalDetails";
  let chosenLang = [];

  useEffect(() => {
    fetchData();
    stepperCheck(index, personalDetails);
  }, []);

  useEffect(() => {
    stepperCheck(index, personalDetails);
  }, [reducer.personalDetails]);

  async function fetchData() {
    const response = await fetchApi.personalAddressAPI();
    if (Array.isArray(response)) {
      let Data = [];
      response.map((item) => {
        Data.push(item.data);
      });
      setApiData(Data);
    } else {
      setStatus(<DialogBox />);
    }
  }
  if (apiData.length) {
    apiData[2].filter((item) => {
      personalDetails.preferredLanguageId.map((value) => {
        if (value === item.id) {
          chosenLang.push(item.name);
        }
      });
      return chosenLang;
    });
  }

  const onTagsChange = (event, value) => {
    let lang = [];
    apiData[2].map((item) => {
      value.map((val) => {
        if (val === item.name) {
          return lang.push(item.id);
        }
      });
    });
    personalDetails["preferredLanguageId"] = lang;
    stepperCheck(index, personalDetails);
    actions.assignData("personalDetails", personalDetails);
  };

  const handleDate = (value) => {
    if (value !== null) {
      const formattedDate = `${value.getFullYear()}-${
        value.getMonth() + 1
      }-${value.getDate()}`;
      personalDetails["dateOfBirth"] = formattedDate;
      if (personalDetails["dateOfBirth"] === "NaN-NaN-NaN") {
        personalDetails["dateOfBirth"] = null;
      }
      actions.assignData("personalDetails", personalDetails);
      stepperCheck(index, personalDetails);
    }
  };
  const formatDate = (dateStr) => {
    if (dateStr !== null) {
      const date = new Date(dateStr);
      return date;
    }
    return null;
  };

  return !apiData.length ? (
    <div className={classes.progress}>{status}</div>
  ) : (
    <div className={classes.userRoot}>
      <Grid className={classes.grid} container spacing={3}>
        <InputField
          sm={6}
          error={errors.name}
          helperText={errors.name ? "*This Field is Mandatory" : ""}
          type="text"
          label="User Name"
          name="name"
          value={personalDetails.name || ""}
          onChange={(event) =>
            handleData(event, index, detail, personalDetails)
          }
        />
        <Grid item xs={12} sm={6} className={classes.alignCenter}>
          <RadioGroup
            row
            aria-label="gender"
            name="gender1"
            className={classes.alignRadio}
          >
            <FormLabel component="legend">Gender</FormLabel>
            {apiData[1] &&
              apiData[1].map((item, index) => {
                if (item.id < 3) {
                  return (
                    <RadioButton
                      key={index}
                      value={item.id || ""}
                      name="genderId"
                      checked={Number(personalDetails.genderId) === item.id}
                      onChange={(event) =>
                        handleData(event, index, detail, personalDetails)
                      }
                      itemName={item.name}
                    />
                  );
                }
              })}
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateField
            value={formatDate(personalDetails.dateOfBirth)}
            onChange={(date) => handleDate(date)}
          />
        </Grid>
        <InputField
          sm={6}
          type="number"
          label="Age"
          name="age"
          value={personalDetails.age || ""}
          onChange={(event) =>
            handleData(event, index, detail, personalDetails)
          }
        />
        <InputField
          sm={6}
          type="text"
          label="Mail Id"
          name="mailId"
          error={errors.mailId}
          disabled={reducer.isEdit}
          helperText={
            errors.mailId
              ? !personalDetails.mailId
                ? "*This Field is Mandatory"
                : emailCheck
                ? "*This Email ID already Exists"
                : "*Email Expected format aaa@bbb.com"
              : ""
          }
          value={personalDetails.mailId || ""}
          onChange={(event) =>
            handleData(event, index, detail, personalDetails)
          }
        />
        <InputField
          sm={6}
          type="number"
          label="Mobile no"
          name="mobNo"
          value={personalDetails.mobNo || ""}
          onChange={(event) =>
            handleData(event, index, detail, personalDetails)
          }
        />
        <SelectField
          sm={6}
          labelName="Mother Tongue"
          className={classes.formControl}
          name="motherTongueId"
          value={personalDetails.motherTongueId || ""}
          onChange={(event) =>
            handleData(event, index, detail, personalDetails)
          }
          data={apiData[2]}
        />
        <Grid item sm={12}>
          {apiData[2] && (
            <CustomAutocomplete
              multiple
              id="tags-standard"
              value={chosenLang || ""}
              name="preferredLanguageId"
              options={apiData[2].map((item) => item.name)}
              onChange={(event, value) => onTagsChange(event, value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  label="Prefered Language for app"
                />
              )}
            />
          )}
        </Grid>
        <Grid item sm={12}>
          <Typography className={classes.Typography}>
            How you come to know about the product
          </Typography>
        </Grid>
        <CheckBoxField
          checked={
            (apiData[0] && personalDetails.knownViaProducts.includes(1)) ||
            false
          }
          onChange={(event) =>
            handleCheckbox(event, index, detail, apiData[0][0].id)
          }
          label={apiData[0] && apiData[0][0].name}
          sm={3}
        />
        {apiData[0] &&
          apiData[0].map((item, indice) => {
            if (item.id > 1) {
              return (
                <CheckBoxField
                  key={indice}
                  checked={
                    apiData[0] &&
                    personalDetails.knownViaProducts.includes(item.id)
                  }
                  onChange={(event) =>
                    handleCheckbox(event, index, detail, item.id)
                  }
                  label={item.name}
                  sm={2}
                />
              );
            }
          })}
        <InputField
          className={
            personalDetails.knownViaProducts.includes(6)
              ? classes.show
              : classes.hide
          }
          sm={12}
          type="text"
          label="Other"
          name="others"
          value={personalDetails.others || ""}
          onChange={(event) =>
            handleData(event, index, detail, personalDetails)
          }
        />
      </Grid>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(PersonalDetails);
