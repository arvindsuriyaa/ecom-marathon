import React from "react";
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
import { marketingMedium } from "../../utils/productSeed";
import DateField from "../common/DateField";
import RadioButton from "../common/RadioButton";
import SelectField from "../common/SelectField";

const PersonalDetails = (props) => {
  const classes = personalStyle();
  const { actions, reducer } = props;
  const { handleData, handleCheckbox } = actions;
  const { personalDetails, errors, emailCheck } = reducer;
  const { knowProduct } = personalDetails;
  let index = 0;
  let detail = "personalDetails";

  const onTagsChange = (event, values) => {
    personalDetails["languageTags"] = values;
    actions.assignData("personalDetails", personalDetails);
  };

  return (
    <div className={classes.userRoot}>
      <Grid className={classes.grid} container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField
            error={errors.userName}
            helperText={errors.userName ? "*This Field is Mandatory" : ""}
            type="text"
            label="User Name"
            name="userName"
            value={personalDetails.userName || ""}
            onChange={(event) => handleData(event, index, detail)}
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
            <FormControlLabel
              value="male"
              control={
                <RadioButton
                  name="gender"
                  value="male"
                  checked={personalDetails["gender"] === "male"}
                  onChange={(event) => handleData(event, index, detail)}
                />
              }
              label="Male"
            />
            <FormControlLabel
              value="female"
              control={
                <RadioButton
                  name="gender"
                  value="female"
                  checked={personalDetails["gender"] === "female"}
                  onChange={(event) => handleData(event, index, detail)}
                />
              }
              label="Female"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} sm={6}>
          <DateField
            value={personalDetails.dob}
            onChange={(date) => {
              personalDetails["dob"] = date;
              actions.assignData("personalDetails", personalDetails);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="number"
            label="Age"
            name="age"
            value={personalDetails.age}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="text"
            label="Mail Id"
            name="email"
            error={errors.email}
            helperText={
              errors.email
                ? !personalDetails.email
                  ? "*This Field is Mandatory"
                  : emailCheck
                  ? "*This Email ID already Exists"
                  : "*Invalid Email"
                : ""
            }
            value={personalDetails.email}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            type="number"
            label="Mobile no"
            name="mobileNumber"
            value={personalDetails.mobileNumber}
            onChange={(event) => handleData(event, index, detail)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            variant="filled"
            className={classes.formControl}
            fullWidth="true"
          >
            <InputLabel>Mother Tongue</InputLabel>
            <SelectField
              name="motherTongue"
              value={personalDetails.motherTongue}
              onChange={(event) => handleData(event, index, detail)}
              data={["English", "Tamil", "Hindi", "Malayalam"]}
            />
          </FormControl>
        </Grid>
        <Grid item sm={12}>
          <CustomAutocomplete
            multiple
            id="tags-standard"
            value={personalDetails.languageTags}
            name="languageTags"
            options={["English", "Hindi", "Telugu", "Malayalam"]}
            onChange={(event, values) => onTagsChange(event, values)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                label="Prefered Language for app"
              />
            )}
          />
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
                checked={personalDetails.knowProduct.isNews}
                onChange={(event) => handleCheckbox(event, index, detail)}
                name="isNews"
                color="primary"
              />
            }
            label="News Paper/Ads"
          />
        </Grid>
        {marketingMedium.map((media) => {
          return (
            <Grid item sm={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={personalDetails.knowProduct[media[1]]}
                    onChange={(event) => handleCheckbox(event, index, detail)}
                    name={media[1]}
                    color="primary"
                  />
                }
                label={media[0]}
              />
            </Grid>
          );
        })}
        <Grid
          item
          sm={12}
          className={knowProduct.isOthers ? classes.show : classes.hide}
        >
          <InputField
            type="text"
            label="Other"
            name="other"
            value={personalDetails.other}
            onChange={(event) => handleData(event, index, detail)}
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
