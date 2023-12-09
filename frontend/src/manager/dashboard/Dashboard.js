import React from 'react';
import { useNavigate } from 'react-router';
import "./dashboard.css"
import BarChart from '../charts/barchart';
import LineChart from '../charts/line';
import DoughnutChart from '../charts/doughnut';
import {Button} from "react-bootstrap";
const Dashboards = () => {
  const navigate=useNavigate();
  const gotoreports=()=>{
    navigate("reports");
  }
  const gotoproducts=()=>{
    navigate("products");
  }

  const gotoemployees=()=>{
    navigate("employees");
  }

  return (
    <div className="dashboard-main-container">
      {/* <div className='owner-det shadow rounded m-2 mx-2 p-2 w-25'><h4>Name</h4><hr/>Supermarket Dashboard</div> */}
      <div className='row sales-activities'>
        <div className='col-6 row sales-text justify-content-center'>
          <div className='col-5 shadow rounded m-2 p-3'><h5>Total Orders Today</h5><hr/>1000</div>
          <div className='col-5 shadow rounded m-2 p-3'><h5>Total Orders Today</h5><hr/>1000</div>
          <div className='col-5 shadow rounded m-2 p-3'><h5>Total Orders Today</h5><hr/>1000</div>
          <div className='col-5 shadow rounded m-2 p-3'><h5>Total Orders Today</h5><hr/>1000</div>
        </div>
        <div className='col-6 sales-text shadow rounded p-3 '><h2>Activities</h2><hr/>Hire staff - manager</div>
      </div>
      <div className=' stock-staff-analysis row justify-content-center'>
        <div className=' col-6 shadow rounded m-3 p-4'><h5>Stocks Analysis</h5> <hr/>
        <div className='stock-analysis'><DoughnutChart/> </div> 
        <Button onClick={gotoproducts}>View Stocks</Button> 
        </div>
        <div className='  col-5 shadow rounded m-3 p-4'><h5>Staff Perfomance</h5> <hr/>
        <div className='staff-perfomance'><BarChart/></div> 
        <Button onClick={gotoemployees}>View Stocks</Button></div> 
      <br/>
      <div className='col-11  shadow rounded m-3 p-4'><h3>sales chart</h3> <hr/>
       <div className='sales-chart'> <LineChart/></div>
        <Button onClick={gotoreports}>View Reports</Button> 
        </div>
    </div>
    </div>

  );
};

export default Dashboards;
