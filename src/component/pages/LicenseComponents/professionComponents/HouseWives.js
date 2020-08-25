/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { HouseWifeForm } from "../../../../styles/FormStyles";
import { bindDispatch } from "../../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";

const HouseWives = (props) => {
  const classes = HouseWifeForm();
  const { actions } = props;
  const { stepperCheck } = actions;
  const index = 2;

  useEffect(() => {
    stepperCheck(index, {});
  }, []);

  return <div className={classes.root}>No Form Available</div>;
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(HouseWives);
