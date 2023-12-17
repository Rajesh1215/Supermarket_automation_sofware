import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "./sales.css";
import DoughnutChart from "../charts/doughnut.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Modal, Button, Table } from "react-bootstrap";

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [customers, setCustomers] = useState({});
  const navigate=useNavigate();

  useEffect(() => {
    const fetchDataOrders = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/orders/");
        const ordersData = response.data;
        setOrders(ordersData);

        // Fetch customer details using customer_ids from orders
        const customerIds = ordersData.map((order) => order.customer_id);
        const customersResponse = await axios.get(
          "http://127.0.0.1:8000/customers/",
          {
            params: { customer_ids: customerIds.join(",") },
          }
        );
        const customersData = customersResponse.data;
        const customersMap = {};
        customersData.forEach((customer) => {
          customersMap[customer.customer_id] = customer.name;
        });
        setCustomers(customersMap);
      } catch (error) {
        console.error("Error fetching orders data:", error);
      }
    };

    fetchDataOrders();
  }, []);

const filteredOrders = orders.filter((order) => {
  const customerName = customers[order.customer_id] || "";

  const includesSearchQuery =
    searchQuery.trim() === "" ||
    customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.order_id.toString().includes(searchQuery.toLowerCase());

  const withinDateRange =
    (!startDate || new Date(order.created_at) >= new Date(startDate)) &&
    (!endDate || new Date(order.created_at) <= new Date(endDate));

  return includesSearchQuery && withinDateRange;
});

  return (
    <div className="sales-main-container">
      <div className="search-component d-flex justify-content-between ">
        <div>
          <h2>Orders</h2>
        </div>
        <div className="products-num-stats d-flex justify-content-around"></div>
      </div>

      <div className="product-statuses row flex-wrap align-items-center">
        <div className="col-7 row">
          <OrderListComponent />
        </div>

        <div className="col-5 instock-graph d-flex justify-content-center">
          <StockChart />
        </div>
      </div>

      <div className="mt-5 mb-1">
        <h2>Orders</h2>
      </div>
      <div className=" mx-3 my-3 d-flex justify-content-between">
        <div className="search-input d-flex w-50">
          <FontAwesomeIcon icon={faSearch} className="ml-2 mx-2" />
          <input
            type="text"
            className="border-0"
            placeholder="Search Orders"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className=" mx-5 my-2">
          <b>From :</b>
          <input
            type="date"
            className="bg-white border-0 mx-3"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <b>To :</b>
          <input
            type="date"
            className="bg-white border-0 mx-3"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div className="all-sales">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Price</th>
              <th>Total</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.order_id} onClick={()=>navigate(`orders/${order.order_id}`)}>
                <td>{order.order_id}</td>
                <td>{customers[order.customer_id]}</td>
                <td>{`$${order.total_price}`}</td>
                <td>{`$${order.total_price}`}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ReturnsComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [returnsData, setReturnsData] = useState([]);
  const [returnslength, setReturnslength] = useState(0);
  const handleShowModal = () => {
    setShowModal(true);
    fetchDataReturns();
  };

  const handleHideModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    fetchDataReturns();
  }, []);

  const fetchDataReturns = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/returns/");
      setReturnsData(response.data);
      setReturnslength(response.data.length);
    } catch (error) {
      console.error("Error fetching returns data:", error);
    }
  };

  return (
    <div>
      <div className="product-count mx-2">Total returns: {returnslength}</div>
      <Button variant="primary" onClick={handleShowModal} className="my-2">
        Open Returns Modal
      </Button>

      <Modal show={showModal} onHide={handleHideModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Returns Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Return ID</th>
                <th>Product Item ID</th>
              </tr>
            </thead>
            <tbody>
              {returnsData.map((item) => (
                <tr key={item.return_id}>
                  <td>{item.return_id}</td>
                  <td>{item.product_item_id}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export function OrderListComponent() {
  const [metrics, setmetrics] = useState([]);
  const navigate = useNavigate();
  const gotopage = (str) => {
    navigate(str);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/calculate_metrics/"
        );
        const data = response.data;
        setmetrics(data);
        // Handle the data as needed
      } catch (error) {
        console.error("Error fetching metrics data:", error);
        // Handle errors
      }
    };
    fetchData();
  }, []);
  return (
    <div className="col-12 row">
      <div className="col-5">
        <div className="mb-3 out-of-stocks">
          <div className="instock-heading mx-2">Orders details</div>
          <hr />
          <div className="">
            <div className="product-count mx-2">
              Total orders:
              {metrics.all_orders_with_total_profit_price_alt_count}
            </div>
            <div className="items-count mx-2">
              Total Profit in: {metrics.total_profit}
            </div>
          </div>
        </div>

        <div className="expired">
          <div
            className="instock-heading mx-2"
            onClick={() => {
              gotopage("returns");
            }}
          >
            Returns
          </div>
          <hr />
          <div className="">
            <ReturnsComponent />
          </div>
        </div>
      </div>

      <div className="col-7">
        <div className="mb-3 out-of-stocks">
          <div className="instock-heading mx-2">Income details</div>
          <hr />
          <div className="">
            <div className="product-count mx-2">
              Total Expense: {metrics.total_expense}
            </div>
            <div className="items-count mx-2">
              Revenue by sales: {metrics.total_revenue}
            </div>
          </div>
        </div>

        <div className="expired">
          <div className="instock-heading mx-2">Total Orders Today</div>
          <hr />
          <div className="">
            <div className="product-count mx-2">
              Total Revenue: {metrics.today_orders_revenue}
            </div>
            <div className="items-count mx-2">
              Cost price :{metrics.today_orders_cost_price}
            </div>
            <div className="items-count mx-2">
              Profit :{metrics.today_orders_profit_price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function StockChart() {
  const [categorySalesData, setCategorySalesData] = useState(null);
  const [categoryNames, setCategoryNames] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch category sales data
        const categorySalesResponse = await axios.get(
          "http://127.0.0.1:8000/category_sales/"
        );
        setCategorySalesData(categorySalesResponse.data.category_sales_data);

        // Fetch category names
        const categoryNamesResponse = await axios.get(
          "http://127.0.0.1:8000/productcategories/"
        );
        setCategoryNames(categoryNamesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(categoryNames)

  return (
    <>
      {categorySalesData && categoryNames ? (
        <DoughnutChart
          categorySalesData={categorySalesData.map((item) => ({
            ...item,
            categoryName: categoryNames.find(
              (category) =>
                category.product_category_id ===
                item.product__product_category
            )?.name,
          }))}
        />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default Sales;
