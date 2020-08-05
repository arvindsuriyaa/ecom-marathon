import React, { useEffect } from "react";
import Table from "./Component/Table";
import PersonalDetails from "./Component/FormComponents/PersonalDetails";
import AddressDetails from "./Component/FormComponents/AddressDetails";
import ProfessionalDetails from "./Component/FormComponents/ProfessionalDetails";
import * as directory from "./utils/RootDirectory";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Form from "./Component/Form";
const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path={directory.FORM}>
          <Form>
            <Switch>
              <Route
                path={directory.PERSONAL_DETAILS}
                component={PersonalDetails}
              />
              <Route
                path={directory.ADDRESS_DETAILS}
                component={AddressDetails}
              />
              <Route
                path={directory.PROFESSIONAL_DETAILS}
                component={ProfessionalDetails}
              />
              <Redirect from={directory.FORM} to={directory.PERSONAL_DETAILS} />
            </Switch>
          </Form>
        </Route>
        <Route path={directory.TABLE} component={Table} />
        <Redirect exact from="/" to={directory.TABLE} component={Table} />
      </Switch>
    </Router>
  );
};

export default Root;
