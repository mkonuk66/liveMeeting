import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import LiveMeeting from "./Components/LiveMeeting";
import ManagerDashboard from "./Components/Manager/ManagerDashboard";
import EmployeeDashboard from "./Components/Employee/EmployeeDashboard";
import CustomerDashboard from "./Components/Customer/CustomerDashboard";
import ManagerEmployeeList from "./Components/Manager/ManagerEmployeeList";
import ManagerCustomerList from "./Components/Manager/ManagerCustomerList";
import ManagerManagerList from "./Components/Manager/ManagerManagerList";
import AddManager from "./Components/Manager/AddManager";
import AddEmployee from "./Components/Manager/AddEmployee";
import { Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Node, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("jwtToken").length > 10 ? (
          <Node {...props} />
        ) : (
          (alert("Yetkisiz Giriş! Ana Sayfaya Yönlendiriliyorsunuz..."),
          (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          ))
        )
      }
    />
  );
};
export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <PrivateRoute path="/liveMeeting" component={LiveMeeting} />
          <PrivateRoute path="/managerDashboard" component={ManagerDashboard} />
          <PrivateRoute
            path="/employeeDashboard"
            component={EmployeeDashboard}
          />
          <PrivateRoute
            path="/customerDashboard"
            component={CustomerDashboard}
          />
          <PrivateRoute path="/employeeList" component={ManagerEmployeeList} />
          <PrivateRoute
            path="/customerStatistics"
            component={ManagerCustomerList}
          />
          <PrivateRoute path="/managerList" component={ManagerManagerList} />
          <PrivateRoute path="/addManager" component={AddManager} />
          <PrivateRoute path="/addEmployee" component={AddEmployee} />
        </Switch>
      </div>
    );
  }
}
