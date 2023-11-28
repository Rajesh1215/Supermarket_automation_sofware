import React from "react";
import "./products.css";

const Products = () => {
  return (
    <div className="main-product-component">
      <div className="stock-product-activity">
        <h2>Stock & Product Activity</h2>
        <div className="stock-activity">
          <h3>Stock Levels</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Laptop</td>
                <td>20</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>15</td>
                <td>Low Stock</td>
              </tr>
              <tr>
                <td>Tablet</td>
                <td>50</td>
                <td>In Stock</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="product-verification">
          <h3>Product Verifications</h3>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Verification Status</th>
                <th>Date Verified</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>P1001</td>
                <td>Laptop</td>
                <td>Verified</td>
                <td>2023-11-28</td>
              </tr>
              <tr>
                <td>P1002</td>
                <td>Phone</td>
                <td>Pending</td>
                <td>2023-11-27</td>
              </tr>
              <tr>
                <td>P1003</td>
                <td>Tablet</td>
                <td>Verified</td>
                <td>2023-11-26</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="product-add">
          <h3>Add Product</h3>
          <div className="form-group">
            <label for="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              className="form-control"
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label for="productCategory">Category:</label>
            <select id="productCategory" className="form-control">
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div className="form-group">
            <label for="productQuantity">Quantity:</label>
            <input
              type="number"
              id="productQuantity"
              className="form-control"
              placeholder="Enter quantity"
            />
          </div>

          <div className="form-group">
            <label for="productPrice">Price:</label>
            <input
              type="number"
              id="productPrice"
              className="form-control"
              placeholder="Enter product price"
            />
          </div>

          <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
      </div>
      <div className="All-products">
        All products
      </div>
    </div>
  );
}

export default Products;