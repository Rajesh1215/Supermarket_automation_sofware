import React,{useState,useEffect} from "react";
import { Button,Modal,Form,Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import BarChart from "../charts/charts";
import axios from "axios";

const Employees = () => {
  const navigate = useNavigate();
  
  const gotoEmployeeDetails = (id) => {
    navigate(`employee-details/${id}`);
  };

  const [Employees, setEmployees] = useState([]);


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/employees/');
        setEmployees(response.data);
        // axios.get('http://127.0.0.1:8000/duties/')
        // .then(response => setDutyData(response.data))  // Display only the first five duties
        // .catch(error => console.error('Error fetching duty data:', error));

      } catch (error) {
        console.error('Error fetching employees data:', error);
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
      <div className="employee-profile-container row " onClick={()=>{gotoEmployeeDetails(employee.user_id)}}>
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
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  const handleshowAddEmployee = () => setShowAddEmployee(true);


  const handleCloseModals = () => {
    setShowAddEmployee(false);
  };

  const AddEmployee = ({ show, handleClose }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add new product form */}
          <Form>
            {/* Include form fields for adding a new product */}
            {/* For example, product name, category, price, etc. */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
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
      <div className="col-6 shadow rounded">
        <PerformanceCOmponent/></div>
        <div className="col-5 shadow rounded"> <ActivitiesComponent/></div>
      </div>
      <div className="">
        <div className="d-flex mt-5 mx-5 justify-content-between border-0 ">
        <h2>Employees</h2>
        <Button onClick={handleshowAddEmployee}>Add Employee</Button>
        </div>
      <hr />
      <div className="employee-list mx-3 w-100">
        {/* <div className="managers w-100">
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
        </div> */}

        <div className="staff w-100" >
          <h2>Staff</h2>
            {staff.map((employee) => (
              <EmployeeProfile employee={employee} /> 
            ))}
        </div>
      </div>
      </div>
      <AddEmployee show={showAddEmployee} handleClose={handleCloseModals} />
    </div>
  );
};


export function ActivitiesComponent(){
  const [showSeemore, setShowSeemore] = useState(false);
  const [dutyData, setDutyData] = useState([]);
  const handleshowAssignTasks = () => setShowAssignTasks(true);
  const [showAssignTasks, setShowAssignTasks] = useState(false);


  const handleshowSeemore = () => setShowSeemore(true);

  const handleCloseModals = () => {
    setShowSeemore(false);
    setShowAssignTasks(false);

  };
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        axios.get('http://127.0.0.1:8000/duties/')
        .then(response => setDutyData(response.data))  // Display only the first five duties
        .catch(error => console.error('Error fetching duty data:', error));

      } catch (error) {
        console.error('Error fetching employees data:', error);
      }
      
    };

    fetchEmployees();
  }, []);

  const Seemore = ({ show, handleClose }) => {
    return (
      <Modal show={show} onHide={handleClose}>
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
              {dutyData.map(duty => (
                <tr key={duty.id}>
                  <td>{duty.id}</td>
                  <td>{duty.staff_cat}</td>
                  <td>{duty.work}</td>
                  <td>{duty.status}</td>
                  <td>{duty.deadline}</td>
                  <td>{duty.employee}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  const AssignTasks = ({ show, handleClose }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>See Purchases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display information related to purchases */}
          {/* For example, a table of purchase history */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };
  return(
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
              {dutyData.slice(0,4).map(duty => (
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
          <Button className="mx-3" onClick={handleshowSeemore}>See More</Button>
          <Button onClick={handleshowAssignTasks}>Assign a task</Button>
          </div>
          <Seemore show={showSeemore} handleClose={handleCloseModals} />
          <AssignTasks show={showAssignTasks} handleClose={handleCloseModals} />


        </div>
  )
}

export function PerformanceCOmponent(){
  return(
    <div className="row  p-1">
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
  )
}

export default Employees;
