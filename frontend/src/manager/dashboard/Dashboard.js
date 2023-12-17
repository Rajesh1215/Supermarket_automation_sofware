import React from 'react';
import { useNavigate } from 'react-router';
import "./dashboard.css"
// import BarChart from '../charts/barchart';
// import LineChart from '../charts/line';
// import DoughnutChart from '../charts/doughnut';
import {Button} from "react-bootstrap";
import {OrderListComponent} from "../sales/sales";
import { PerformanceCOmponent,ActivitiesComponent } from '../employees/employees';
import { StockChart } from '../sales/sales';
import {RevenueStock} from '../reports/reports';

const Dashboards = () => {
  const navigate=useNavigate();
  const gotoreports=()=>{
    navigate("reports");
  }
  // const gotoproducts=()=>{
  //   navigate("products");
  // }

  // const gotoemployees=()=>{
  //   navigate("employees");
  // }

  return (
    <div className="dashboard-main-container">
      {/* <div className='owner-det shadow rounded m-2 mx-2 p-2 w-25'><h4>Name</h4><hr/>Supermarket Dashboard</div> */}
      <div className='row sales-activities align-items-center'>
        <div className='col-6 row sales-text justify-content-center'>

          <OrderListComponent/>
        </div>
        <div className='col-6 sales-text shadow rounded py-2'><ActivitiesComponent/></div>
      </div>
      <div className=' stock-staff-analysis row justify-content-center'>
        <div className=' col-6 shadow rounded m-3 p-4'>
        <PerformanceCOmponent/>
        
        </div>
        <div className='  col-5 shadow rounded m-3 p-4'><h5>Stocks Analysis</h5> <hr/>
        <div className='stock-analysis mx-5 px-3'><StockChart/> </div> 
        {/* <Button onClick={gotoproducts}>View Stocks</Button>  */}
        </div>
      <br/>
      <div className='col-11  shadow rounded m-3 p-4'><h3>sales chart</h3> <hr/>
       <div className='sales-chart'> <RevenueStock/></div>
        <Button onClick={gotoreports}>View Reports</Button> 
        </div>
    </div>
    </div>

  );
};

export default Dashboards;
