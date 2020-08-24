import { memoize } from "lodash";
import { bindActionCreators } from "redux";
import * as actions from "../store/action/action";
import * as appFunctions from "./utils";

const bindDispatch = memoize((dispatch) => ({
  actions: bindActionCreators(Object.assign({}, actions, appFunctions), dispatch),
}));

export default bindDispatch;
