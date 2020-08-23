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
import License from "./component/pages/License";
import NavBar from "./component/common/NavBar";
const Root = () => {
  return (
    <>
      <NavBar />
      <Router>
        <Switch>
          <Route path={routePath.FORM}>
            <License>
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
            </License>
          </Route>
          <Route
            path={routePath.TABLE}
            render={(prop) => <LicenseList {...prop} />}
          />
          <Redirect exact from="/" to={routePath.TABLE} />
        </Switch>
      </Router>
    </>
  );
};

export default Root;
