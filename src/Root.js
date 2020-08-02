import React from "react";
import Table from "./Component/Table";
import PersonalDetails from "./Component/FormComponents/PersonalDetails";
import AddressDetails from "./Component/FormComponents/AddressDetails";
import ProfessionalDetails from "./Component/FormComponents/ProfessionalDetails";
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
        <Route path="/Form">
          <Form>
            <Switch>
              <Route path="/Form/PersonalDetails" component={PersonalDetails} />
              <Route path="/Form/AddressDetails" component={AddressDetails} />
              <Route
                path="/Form/ProfessionalDetails"
                component={ProfessionalDetails}
              />
              <Redirect from="/Form" to="/Form/PersonalDetails" />
            </Switch>
          </Form>
        </Route>
        <Route path="/Table" component={Table} />
        <Redirect exact from="/" to="/Form" component={Form} />
      </Switch>
    </Router>
  );
};

export default Root;
