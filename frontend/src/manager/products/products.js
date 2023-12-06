import React from "react";
import "./products.css"
import { useNavigate } from "react-router";
const Products = () => {
  const navigate = useNavigate();
  const Allcato = ()=>{
    navigate("catogaries");
  }
  return (
    <div className="main-product-component">
      <div className="search-component d-flex justify-content-between align-items-center">
        <div>
          <input type="text" className="form-control" placeholder="Search Products" />
        </div>

      </div>

      <div className="product-status d-flex flex-wrap justify-content-between">
        <div className="instock">
          <div className="status-label">In Stock</div>
          <div className="status-count">100</div>
        </div>

        <div className="nearly-completed">
          <div className="status-label">Nearly Completed</div>
          <div className="status-count">25</div>
        </div>

        <div className="out-of-stocks">
          <div className="status-label">Out of Stock</div>
          <div className="status-count">50</div>
        </div>

        <div className="nearly-expiring">
          <div className="status-label">Nearly Expiring</div>
          <div className="status-count">20</div>
        </div>

        <div className="expired">
          <div className="status-label">Expired</div>
          <div className="status-count">10</div>
        </div>
      </div>

      <div className="see-products">
        {/* Product list or table */}
        see products
      </div>

      <div className="products-add-read d-flex justify-content-between">
        <div className="add-stock">
          {/* Add stock button */}
          add stock
        </div>

        <div className="add-category">
          {/* Add category button */}
          add catogory
        </div>
      </div>

      <div className="catogaries">
        {/* Category list or selection */}
        all catogaries
        <div className="cato" onClick={Allcato}>
          textils
        </div>
      </div>

      <div className="High-trades">
        {/* Top selling products section */}
        high trades
      </div>

      <div className="recents">
        recents
        {/* Recently added or updated products section */}
      </div>
    </div>
  );
};

export default Products;
