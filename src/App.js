import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import EmployeesList from "./components/employees-list.component";
import EditEmployees from "./components/edit-employees.component";
import CreateEmployees from "./components/create-employees.component";


class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/api/employees" className="navbar-brand">IBM Employees</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/api/employees/:id" className="nav-link">Update Employees</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/api/employees/create" className="nav-link">Create Employees</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path="/api/employees" exact component={EmployeesList} />
          <Route path="/api/employees/:id" component={EditEmployees} />
          <Route path="/api/employees/create" component={CreateEmployees} />
        </div>
      </Router>
    );
  }
}

export default App;
