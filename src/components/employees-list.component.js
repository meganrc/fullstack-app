import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Employee = props =>(
  <tr>
    <td>{props.employee.firstName}</td>
    <td>{props.employee.lastName}</td>
    <td>{props.employee.hireDate}</td>
    <td>{props.employee.role}</td>
    <td>{props.employee.joke}</td>
    <td>{props.employee.quote}</td>
    <td>
        <Link to={"/api/employees/"+props.employee._id}>Edit Employee</Link>
    </td>
  </tr>
)

export default class EmployeesList extends Component{

  constructor(props){
    super(props);

    this.state={employees: []};
  }

  componentDidMount(){
    axios.get('http://localhost:3000/api/employees/retrieve')
        .then(response => {
          this.setState({ employees: response.data});
        })
        .catch(function(error) {
          console.log(error);
        })
  }



  employeeList(){
    return this.state.employees.map(function(currentEmployee, i){
      return <Employee employee={currentEmployee} key={i} />;
    })
  }

  render(){
    return (
      <div>
        <h3> Employee List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }} >
            <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Hire Date</th>
                  <th>Role</th>
                  <th>Joke</th>
                  <th>Quote</th>
                </tr>
            </thead>
            <tbody>
              { this.employeeList() }
            </tbody>
        </table>
      </div>
    )
  }
}
