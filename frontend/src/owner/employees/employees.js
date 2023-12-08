import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { useUserContext } from "../../data/data";
import "./employees.css";
import BarChart from "../charts/barchart";

const Employees = () => {
  const navigate = useNavigate();
  const { Employees } = useUserContext();
  
  const gotoEmployeeDetails = () => {
    navigate("employee-details");
  };

  const gotoCommunity = () => {
    navigate("/owner/community");
  };

  // Filter employees based on their positions
  const managers = Employees.filter(
    (employee) => employee.status === "manager"
  );
  const supervisors = Employees.filter(
    (employee) => employee.status === "supervisor"
  );
  const staff = Employees.filter((employee) => employee.status === "staff");

  const EmployeeProfile = ({ employee }) => {
    return (
      <div className="employee-profile-container row " onClick={gotoEmployeeDetails}>
        <hr/>
        <div className="employee-profile-photo col-3">
          {/* Display employee photo here */}
          <img src={"https://via.placeholder.com/150"} alt={"photoof"} />
        </div>
        <div className="employee-profile-details col-9">
          <h3>{employee.name}</h3>
          <p>Mail ID : {employee.mail_id}</p>
          <p>Position: {employee.status}</p>
          <p>Performance Index: {employee.performance}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="employees-main-container">
      <div className="search-component d-flex justify-content-between ">
        <div className="search-input mx-3 my-1">
          <FontAwesomeIcon icon={faSearch} className="ml-2 mx-2" />
          <input
            type="text"
            className="border-0"
            placeholder="Search Employees"
          />
        </div>
        <div className="products-num-stats d-flex justify-content-around">
          <div className="products-purchase mx-3">
            • Managers: {managers.length}
          </div>
          <div className="products-sold mx-3">
            • Supervisors: {supervisors.length}
          </div>
          <div className="products-stock mx-3">
            • Other staff: {staff.length}
          </div>
        </div>
      </div>

      <div className="row mt-5 mx-1 mb-5  justify-content-around">
        <div className="col-7 row shadow rounded p-3">
          <h4>Perfomance chart</h4>
          <hr />
          <div className="perfomance-chart col-6">
            <BarChart />
          </div>
          <div className="col-6 align-items-center">
            <ul className="">
              <li>• Total:</li>
              <li>• High perfomances:</li>
              <li>• Medium:</li>
              <li>• Low:</li>
            </ul>
          </div>
          {/* Add your performance charts here */}
          {/* Example: <PerformanceCharts /> */}
        </div>
        <div className="col-4 shadow rounded p-3">
          <h2>Activities to be done</h2>
          <hr />
          {/* Add your performance charts here */}
          {/* Example: <PerformanceCharts /> */}
          <Button>See More</Button>
        </div>
      </div>
      <div className="">
        <div className="d-flex mt-5 mx-5 justify-content-between border-0 ">
        <h2>Employees</h2>
        <Button onClick={gotoCommunity}>View commmunity</Button>
        </div>
      <hr />
      <div className="employee-list mx-3 w-100">
        <div className="managers w-100">
          <h2>Managers</h2>

            {managers.map((employee) => (
              <EmployeeProfile employee={employee} /> 
            ))}
        </div>

        <div className="supervisors w-100">
          <h2>Supervisors</h2>
          <ul>
            {supervisors.map((employee) => (
              <EmployeeProfile employee={employee} /> 
            ))}
          </ul>
        </div>

        <div className="staff w-100" onClick={gotoEmployeeDetails}>
          <h2>Staff</h2>
            {staff.map((employee) => (
              <EmployeeProfile employee={employee} /> 
            ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Employees;
