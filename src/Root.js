import React from "react";
import LicenseList from "./component/pages/LicenseList";
import PersonalDetails from "./component/pages/LicenseComponents/PersonalDetails";
import AddressDetails from "./component/pages/LicenseComponents/AddressDetails";
import ProfessionalDetails from "./component/pages/LicenseComponents/ProfessionalDetails";
import * as routePath from "./constants/path";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import AddLicense from "./component/pages/AddLicense";
import NavBar from "./component/common/NavBar";
const Root = () => {
  return (
    <>
      <NavBar />
      <Router>
        <Switch>
          <Route path={routePath.FORM}>
            <AddLicense>
              <Switch>
                <Route
                  path={routePath.PERSONAL_DETAILS}
                  component={PersonalDetails}
                />
                <Route
                  path={routePath.ADDRESS_DETAILS}
                  component={AddressDetails}
                />
                <Route
                  path={routePath.PROFESSIONAL_DETAILS}
                  component={ProfessionalDetails}
                />
                <Redirect
                  from={routePath.FORM}
                  to={routePath.PERSONAL_DETAILS}
                />
              </Switch>
            </AddLicense>
          </Route>
          <Route path={routePath.TABLE} component={LicenseList} />
          <Redirect exact from="/" to={routePath.TABLE} />
        </Switch>
      </Router>
    </>
  );
};

export default Root;
