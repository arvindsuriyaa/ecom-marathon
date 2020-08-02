import { memoize } from "lodash";
import { bindActionCreators } from "redux";
import * as actions from "../store/action/action";

const bindDispatch = memoize((dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
}));

export default bindDispatch;
