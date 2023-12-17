import React,{useEffect,useState} from "react";
import "./reports.css";
import LineChart,{ExpenseLinechart} from "../charts/line";
import Barchart from "../charts/barchart";
import axios from "axios";
import { StockChart } from "../sales/sales"; 

const Reports = () => {
  return(
  <div className="d-flex flex-column mx-3 mt-3 mb-5">
    {/* <h4>Today's Report</h4>
    
      <div className="heading-stats row">
        <div className="shadow rounded col-2 m-3 p-3 ">Orders <hr/>today : 100 </div>
        <div className="shadow rounded col-2 m-3 p-3 ">Sales <hr/>today : 100</div>
        <div className="shadow rounded col-2 m-3 p-3 ">Revenue <hr/>today : 100</div>
        <div className="shadow rounded col-2 m-3 p-3 ">Profit/Loss <hr/>today : 100</div>
      </div> */}
      {/* Line Chart */}
      <div className="mb-4 revenue-expense-chart">
        <h2>Revenue And Expense Chart</h2>
        <RevenueStock />
      </div>
      {/* Two Line Charts */}
      <h2 className="mt-5 mb-4" >Product Perfomances</h2>
      <div className="d-flex justify-content-between mb-5">
        <div className="product-revenue-expense-chart px-3 w-50">
          <h4>Revenue And Expense Chart</h4>
          <ExpenseLinechartContainer/>
        </div>
        <div className="product-price-chart px-5 w-50">
          <h4 className="mx-4">Price Perfomance</h4>
          <StockChart/>
        </div>
      </div>

      {/* Two Bar Charts
      <div className="d-flex justify-content-between mt-5">
        <div className="high-sales-products px-3 w-50">
          <h4>Top 5 High Sales by products</h4>
          <Barchart/>
        </div>
        <div className="high-revenue-products px-3 w-50">
          <h4>Top 5 High Profits by products</h4>
          <Barchart/>
        </div>
      </div> */}
      <Top5BarchartsSalesRevenueStock/>
    </div>
  );
};

// export function RevenueStock(){
//   return (
//     <LineChart />
//   )
// }

export function RevenueStock() {
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/Monthwise_data/");
        setRevenueData(response.data.monthly_data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchData();
  }, []);

  return <LineChart data={revenueData} />;
}

function ExpenseLinechartContainer(){
  const [revenueData, setRevenueData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/Monthwise_data/");
        setRevenueData(response.data.monthly_data);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchData();
  }, []);

  return <ExpenseLinechart data={revenueData} />;
}

export function Top5BarchartsSalesRevenueStock() {
  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [productNames, setProductNames] = useState({});

  useEffect(() => {
    // Fetch product names from the products API
    axios.get("http://127.0.0.1:8000/products/")
      .then(response => {
        const products = response.data.reduce((acc, product) => {
          acc[product.product_id] = product.name;
          return acc;
        }, {});
        setProductNames(products);
      })
      .catch(error => {
        console.error("Error fetching product names:", error);
      });

    // Fetch data using Axios
    axios.get("http://127.0.0.1:8000/category_sales/")
      .then(response => {
        const { product_sales_data, product_revenue } = response.data;

        // Sort the data by total sales and revenue
        const sortedSalesData = product_sales_data.sort((a, b) => b.total_sales_by_pro - a.total_sales_by_pro);
        const sortedRevenueData = product_revenue.sort((a, b) => b.total_revenue_by_pro - a.total_revenue_by_pro);

        // Process data to find top 5 products for sales and revenue
        const top5Sales = sortedSalesData.slice(0, 5);
        const top5Revenue = sortedRevenueData.slice(0, 5);

        // Set state with the top 5 products
        setSalesData(top5Sales);
        setRevenueData(top5Revenue);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="d-flex justify-content-between mt-5">
      <div className="high-sales-products px-3 w-50">
        <h4>Top 5 High Sales by products</h4>
        {/* Pass the top 5 sales data objects to the BarChart component */}
        <Barchart labels={salesData.map(item => productNames[item.product])} data={salesData.map(item => item.total_sales_by_pro)} />
      </div>
      <div className="high-revenue-products px-3 w-50">
        <h4>Top 5 High Profits by products</h4>
        {/* Pass the top 5 revenue data objects to the BarChart component */}
        <Barchart labels={revenueData.map(item => productNames[item.product])} data={revenueData.map(item => item.total_revenue_by_pro)} />
      </div>
    </div>
  );
}



export default Reports;
