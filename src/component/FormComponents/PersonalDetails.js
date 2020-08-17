import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Typography,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import InputField from "../common/InputField";
import { createSelector } from "reselect";
import { bindDispatch } from "../../utils";
import { connect } from "react-redux";
import { CustomAutocomplete, personalStyle } from "../../styles/FormStyles";
import DateField from "../common/DateField";
import RadioButton from "../common/RadioButton";
import SelectField from "../common/SelectField";

const PersonalDetails = (props) => {
  const classes = personalStyle();
  const { actions, reducer, apiData } = props;
  const { handleData, handleCheckbox, stepperCheck } = actions;
  const { personalDetails, errors, emailCheck } = reducer;
  let index = 0;
  let detail = "personalDetails";
  let chosenLang = [];

  useEffect(() => {
    stepperCheck("personalDetails", index, personalDetails);
  }, []);

  const onTagsChange = (event, value) => {
    let lang = [];
    apiData.language.map((item) => {
      value.map((val) => {
        if (val === item.name) {
          return lang.push(item.id);
        }
      });
    });
    personalDetails["preferredLanguageId"] = lang;
    stepperCheck("preferredLanguageId", index, personalDetails);
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
      stepperCheck("personalDetails", index, personalDetails);
    }
  };
  const formatDate = (dateStr) => {
    if (dateStr !== null) {
      const date = new Date(dateStr);
      return date;
    }
    return null;
  };

  if (apiData.language.length) {
    apiData.language.filter((item) => {
      personalDetails.preferredLanguageId.map((value) => {
        if (value === item.id) {
          chosenLang.push(item.name);
        }
      });
      return chosenLang;
    });
  }

  return (
    <div className={classes.userRoot}>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
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
        </Grid>
        <Grid item xs={12} sm={6} className={classes.alignCenter}>
          <RadioGroup
            row
            aria-label="gender"
            name="gender1"
            className={classes.alignRadio}
          >
            <FormLabel component="legend">Gender</FormLabel>
            {apiData.gender &&
              apiData.gender.map((item, index) => {
                if (item.id < 3) {
                  return (
                    <FormControlLabel
                      key={index}
                      value={item.id}
                      control={
                        <RadioButton
                          name="genderId"
                          checked={Number(personalDetails.genderId) === item.id}
                          onChange={(event) =>
                            handleData(event, index, detail, personalDetails)
                          }
                        />
                      }
                      label={item.name}
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
        <Grid item xs={12} sm={6}>
          <InputField
            type="number"
            label="Age"
            name="age"
            value={personalDetails.age}
            onChange={(event) =>
              handleData(event, index, detail, personalDetails)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
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
                  : "*Invalid Email"
                : ""
            }
            value={personalDetails.mailId}
            onChange={(event) =>
              handleData(event, index, detail, personalDetails)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="number"
            label="Mobile no"
            name="mobNo"
            value={personalDetails.mobNo}
            onChange={(event) =>
              handleData(event, index, detail, personalDetails)
            }
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth={true}
          >
            <InputLabel>Mother Tongue</InputLabel>
            <SelectField
              name="motherTongueId"
              value={personalDetails.motherTongueId}
              onChange={(event) =>
                handleData(event, index, detail, personalDetails)
              }
              data={apiData.language}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          {apiData.language && (
            <CustomAutocomplete
              multiple
              id="tags-standard"
              value={chosenLang}
              name="preferredLanguageId"
              options={apiData.language.map((item) => item.name)}
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
        <Grid item sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  apiData.knowProduct &&
                  personalDetails.knownViaProducts.includes(
                    apiData.knowProduct[0].id
                  )
                }
                onChange={(event) =>
                  handleCheckbox(
                    event,
                    index,
                    detail,
                    apiData.knowProduct[0].id
                  )
                }
                color="primary"
              />
            }
            label={apiData.knowProduct && apiData.knowProduct[0].name}
          />
        </Grid>
        {apiData.knowProduct &&
          apiData.knowProduct.map((item, index) => {
            if (item.id > 1) {
              return (
                <Grid item sm={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={index}
                        checked={
                          apiData.knowProduct &&
                          personalDetails.knownViaProducts.includes(item.id)
                        }
                        onChange={(event) =>
                          handleCheckbox(event, index, detail, item.id)
                        }
                        color="primary"
                      />
                    }
                    label={item.name}
                  />
                </Grid>
              );
            }
          })}
        <Grid
          item
          sm={12}
          className={
            personalDetails.knownViaProducts.includes(6)
              ? classes.show
              : classes.hide
          }
        >
          <InputField
            type="text"
            label="Other"
            name="others"
            value={personalDetails.others}
            onChange={(event) =>
              handleData(event, index, detail, personalDetails)
            }
          />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(PersonalDetails);
