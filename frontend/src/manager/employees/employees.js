import React, { useState, useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import "./employees.css";
import { Histogram } from "../charts/barchart";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const Employees = () => {
  const navigate = useNavigate();

  const gotoEmployeeDetails = (id) => {
    navigate(`employee-details/${id}`);
  };

  const [Employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const selectedPositions = ["manager", "supervisor", "staff"];
  const filteredEmployees = Employees.filter((employee) => {
    const includesSearchQuery = employee.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const includesPosition = selectedPositions.includes(employee.status);
    return includesSearchQuery && includesPosition;
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/employees/");
        setEmployees(response.data);
        // axios.get('http://127.0.0.1:8000/duties/')
        // .then(response => setDutyData(response.data))  // Display only the first five duties
        // .catch(error => console.error('Error fetching duty data:', error));
      } catch (error) {
        console.error("Error fetching employees data:", error);
      }
    };

    fetchEmployees();
  }, []);

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
      <div
        className="employee-profile-container row "
        onClick={() => {
          gotoEmployeeDetails(employee.user_id);
        }}
      >
        <hr />
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
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  const handleshowAddEmployee = () => setShowAddEmployee(true);

  const handleCloseModals = () => {
    setShowAddEmployee(false);
  };

  const AddEmployee = () => {
    const initialValues = {
      username: "",
      name: "",
      dob: "",
      mail_id: "",
      password: "",
      status: "",
      performance: 60, // Assuming a default value for performance
      date_of_join: "",
    };

    const validationSchema = Yup.object({
      username: Yup.string().required("Required"),
      name: Yup.string().required("Required"),
      dob: Yup.date().required("Required"),
      mail_id: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      status: Yup.string().required("Required"),
      date_of_join: Yup.date().required("Required"),
    });

    const onSubmit = async (values, { resetForm }) => {
      try {
        // Perform API request to add employee record
        await axios.post("http://127.0.0.1:8000/employees/", values);

        // You can add additional logic or handle success as needed
        // Reset the form
        resetForm();
        handleCloseModals();
      } catch (error) {
        console.error("Error adding employee record:", error);
        // Handle error, show error message, etc.
      }
    };

    return (
      <Modal show={showAddEmployee} onHide={handleCloseModals}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div>
                <label htmlFor="username">Username:</label>
                <Field type="text" id="username" name="username" />
                <ErrorMessage name="username" component="div" />
              </div>

              <div>
                <label htmlFor="name">Name:</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" />
              </div>

              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <Field type="date" id="dob" name="dob" />
                <ErrorMessage name="dob" component="div" />
              </div>

              <div>
                <label htmlFor="mail_id">Email:</label>
                <Field type="email" id="mail_id" name="mail_id" />
                <ErrorMessage name="mail_id" component="div" />
              </div>

              <div>
                <label htmlFor="password">Password:</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" />
              </div>

              <div>
                <label htmlFor="status">Status:</label>
                <Field as="select" id="status" name="status">
                  <option value="" disabled>
                    Select a status
                  </option>
                  <option value="owner">Owner</option>
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="supervisor">Supervisor</option>
                </Field>
                <ErrorMessage name="status" component="div" />
              </div>

              <div>
                <label htmlFor="date_of_join">Date of Join:</label>
                <Field type="date" id="date_of_join" name="date_of_join" />
                <ErrorMessage name="date_of_join" component="div" />
              </div>

              <div>
                <button type="submit">Submit</button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="employees-main-container">
      <div className="row  mx-1 mb-5  justify-content-around">
        <div className="col-6 shadow rounded">
          <PerformanceCOmponent />
        </div>
        <div className="col-5 shadow rounded">
          {" "}
          <ActivitiesComponent />
        </div>
      </div>

      <div className="">
        <div className="d-flex mt-5 mx-5 justify-content-between border-0 ">
          <h4>Employees</h4>
          <Button onClick={handleshowAddEmployee}>Add Employee</Button>
        </div>
        <hr />
        <div className="search-component d-flex justify-content-between ">
          <div className="search-input mx-3 my-1">
            <FontAwesomeIcon icon={faSearch} className="ml-2 mx-2" />
            <input
              type="text"
              className="border-0"
              placeholder="Search Employees"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
        <div className="employee-list mx-3 w-100">
          <div className="managers w-100">
            <h2>Managers</h2>
            {filteredEmployees
              .filter((employee) => employee.status === "manager")
              .map((employee) => (
                <EmployeeProfile key={employee.user_id} employee={employee} />
              ))}
          </div>

          <div className="supervisors w-100">
            <h2>Supervisors</h2>
            {filteredEmployees
              .filter((employee) => employee.status === "supervisor")
              .map((employee) => (
                <EmployeeProfile key={employee.user_id} employee={employee} />
              ))}
          </div>

          <div className="staff w-100">
            <h2>Staff</h2>
            {filteredEmployees
              .filter((employee) => employee.status === "staff")
              .map((employee) => (
                <EmployeeProfile key={employee.user_id} employee={employee} />
              ))}
          </div>
        </div>
      </div>
      <AddEmployee show={showAddEmployee} handleClose={handleCloseModals} />
    </div>
  );
};

export function ActivitiesComponent() {
  const [showSeemore, setShowSeemore] = useState(false);
  const [dutyData, setDutyData] = useState([]);
  const handleshowAssignTasks = () => setShowAssignTasks(true);
  const [showAssignTasks, setShowAssignTasks] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [run,setrun] = useState(false);

  const handleshowSeemore = () => setShowSeemore(true);

  const handleCloseModals = () => {
    setShowSeemore(false);
    setShowAssignTasks(false);
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/employees/");
        const employeeData = response.data;

        // Set employees in the state
        setEmployees(employeeData);

        axios
          .get("http://127.0.0.1:8000/duties/")
          .then((response) => setDutyData(response.data))
          .catch((error) => console.error("Error fetching duty data:", error));
      } catch (error) {
        console.error("Error fetching employees data:", error);
      }
    };

    fetchEmployees();
  }, [run]);

  const Workdone = async (id) => {
    try {
      // Fetch the existing record
      const response = await axios.get(`http://127.0.0.1:8000/duties/${id}/`);
      const existingData = response.data;
  
      // Update only the 'status' field
      const updateData = {
        ...existingData,
        status: "completed",
      };
  
      // Send the updated data back to the server
      await axios.put(`http://127.0.0.1:8000/duties/${id}/`, updateData);
  
      console.log("Success");
      setrun((prev) => !prev);
    } catch (error) {
      console.error("Error updating duty status:", error);
      console.error("Response status:", error.response.status);
      console.error("Response data:", error.response.data);
      console.error("Response headers:", error.response.headers);
    }
  };
  
  
  

  const Seemore = ({ show, handleClose }) => {
    return (
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Duties</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Staff Category</th>
                <th>Work</th>
                <th>Status</th>
                <th>Deadline</th>
                <th>Employee</th>
              </tr>
            </thead>
            <tbody>
              {dutyData.filter(item => item.status==="pending").map((duty) => (
                <tr key={duty.id}>
                  <td>{duty.id}</td>
                  <td>{duty.staff_cat}</td>
                  <td>{duty.work}</td>
                  <td>{duty.status}</td>
                  <td>{duty.deadline}</td>
                  <td>{duty.employee}</td>
                  <td><Button variant="primary" onClick={()=>Workdone(duty.id)}>Done</Button></td>
                </tr>
                
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const AssignTasks = ({ show, handleClose, employees }) => {
    const initialValues = {
      work: "",
      employee: "",
      deadline: "",
    };

    const validationSchema = Yup.object().shape({
      work: Yup.string().required("Work description is required"),
      employee: Yup.string().required("Employee is required"),
      deadline: Yup.date()
        .required("Deadline is required")
        .min(new Date(), "Deadline must be in the future"),
    });

    const onSubmit = async (values, { resetForm }) => {
      try {
        // Perform API request to add duty record
        await axios.post("http://127.0.0.1:8000/duties/", values);

        // Reset the form
        resetForm();

        // Close the modal
        handleClose();
      } catch (error) {
        console.error("Error adding duty record:", error);
        // Handle error, show error message, etc.
      }
    };

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Duty</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="mb-3">
                <label htmlFor="work" className="form-label">
                  Work Description
                </label>
                <Field
                  as="textarea"
                  name="work"
                  rows={3}
                  className="form-control"
                />
                <ErrorMessage
                  name="work"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="employee" className="form-label">
                  Employee
                </label>
                <Field as="select" name="employee" className="form-control">
                  <option value="" disabled>
                    Select an employee
                  </option>
                  {employees.map((employee) => (
                    <option key={employee.user_id} value={employee.user_id}>
                      {employee.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="employee"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="deadline" className="form-label">
                  Deadline
                </label>
                <Field type="date" name="deadline" className="form-control" />
                <ErrorMessage
                  name="deadline"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="mb-3">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </Form>
          </Formik>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="">
      <h4>Activities to be done</h4>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Work</th>
          </tr>
        </thead>
        <tbody>
          {dutyData.filter(item => item.status==="pending").slice(0, 4).map((duty) => (
            <tr key={duty.id}>
              <td>{duty.employee}</td>
              <td>{duty.work}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Add your performance charts here */}
      {/* Example: <PerformanceCharts /> */}
      <div className="d-flex m-2">
        <Button className="mx-3" onClick={handleshowSeemore}>
          See More
        </Button>
        <Button onClick={handleshowAssignTasks}>Assign a task</Button>
      </div>
      <Seemore show={showSeemore} handleClose={handleCloseModals} />
      <AssignTasks
        show={showAssignTasks}
        handleClose={handleCloseModals}
        employees={employees}
      />
    </div>
  );
}

export function PerformanceCOmponent() {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/employees/");
        const data = response.data;
        const performances = data.map((employee) => employee.performance);
        setPerformanceData(performances);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // Calculate the number of members in each performance category
  const highPerformanceCount = performanceData.filter(
    (score) => score >= 66
  ).length;
  const mediumPerformanceCount = performanceData.filter(
    (score) => score >= 33 && score < 66
  ).length;
  const lowPerformanceCount = performanceData.filter(
    (score) => score < 33
  ).length;

  return (
    <div className="row p-1 h-100">
      <h4>Performance Chart</h4>
      <hr />
      <div className="performance-chart col-12">
        {/* Pass the performance data to the Histogram component */}
        <Histogram data={performanceData} binCount={3} />
      </div>
      <div className="col-12  ">
        <ul className="d-flex justify-content-around px-2">
          <li>Low: {lowPerformanceCount}</li>
          <li>Medium: {mediumPerformanceCount}</li>
          <li>High performances: {highPerformanceCount}</li>
        </ul>
      </div>
    </div>
  );
}

export default Employees;
