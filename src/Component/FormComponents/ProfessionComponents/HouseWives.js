import React, { useEffect } from "react";
import { HouseWifeForm } from "../../../styles/FormStyles";
import { bindDispatch } from "../../../utils";
import { connect } from "react-redux";
import { createSelector } from "reselect";

const HouseWives = (props) => {
  const classes = HouseWifeForm();
  const { reducer, actions } = props;
  const { isCompleted } = reducer;

  useEffect(() => {
    isCompleted[2] = true;
    actions.assignData("isCompleted", isCompleted);
  }, []);

  return <div className={classes.root}>No Form Available</div>;
};

const mapStateToProps = createSelector(
  (state) => state.reducer,
  (reducer) => ({ reducer })
);

export default connect(mapStateToProps, bindDispatch)(HouseWives);
