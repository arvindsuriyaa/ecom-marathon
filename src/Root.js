import React from "react";
import Table from "./component/Table";
import PersonalDetails from "./component/FormComponents/PersonalDetails";
import AddressDetails from "./component/FormComponents/AddressDetails";
import ProfessionalDetails from "./component/FormComponents/ProfessionalDetails";
import * as directory from "./utils/RootDirectory";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Form from "./component/Form";
const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path={directory.FORM}>
          <Form>
            {(props) => (
              <Switch>
                <Route
                  path={directory.PERSONAL_DETAILS}
                  render={(prop) => {
                    const newProps = {
                      ...prop,
                      apiData: { ...props.seed.personalDetailsAPI },
                    };
                    return <PersonalDetails {...newProps} />;
                  }}
                />
                <Route
                  path={directory.ADDRESS_DETAILS}
                  render={(prop) => {
                    const newProps = {
                      ...prop,
                      apiData: { ...props.seed.addressDetailsAPI },
                    };
                    return <AddressDetails {...newProps} />;
                  }}
                />
                <Route
                  path={directory.PROFESSIONAL_DETAILS}
                  render={(prop) => {
                    const newProps = {
                      ...prop,
                      apiData: { ...props.seed.qualificationAPI },
                    };
                    return <ProfessionalDetails {...newProps} />;
                  }}
                />
                <Redirect
                  from={directory.FORM}
                  to={directory.PERSONAL_DETAILS}
                />
              </Switch>
            )}
          </Form>
        </Route>
        <Route path={directory.TABLE} render={(prop) => <Table {...prop} />} />
        <Redirect exact from="/" to={directory.TABLE} />
      </Switch>
    </Router>
  );
};

export default Root;
