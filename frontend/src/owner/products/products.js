import React,{useState} from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button, Accordion , Modal ,Form } from "react-bootstrap";
import { useUserContext } from "../../data/data.js";
import DoughnutChart from "../charts/doughnut.js";


const Products = () => {
  const navigate = useNavigate();
  const Allcato = () => {
    navigate("catogaries");
  };
  const { Product_categories } = useUserContext();

  const renderCategories = () => {
    return Product_categories.map((category) => (
      <Accordion key={category.product_category_id}>
        <Accordion.Item eventKey={category.product_category_id}>
          <Accordion.Header>
            <div className="d-flex justify-content-between w-100">
              {category.name}{" "}
              <div className="d-flex">
                <Button className="mx-5" onClick={Allcato}>
                  {" "}
                  View Details
                </Button>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="accordian-bod">
            <div className="h-100 w-100 row">
              <div className="col-5 d-flex justify-content-center"><DoughnutChart  /></div>
              <div className="col-6 ">
                <div className="d-flex justify-content-around mb-3">
                  <div className="totals" >Total Products : 100 </div> <div className="totals" >Total Items : 100 </div>
                </div>
                <div className="good-stock-products product-stats"> ■ 100 products good stock with 1000 items</div>
                <div className="nearly-expiring-products product-stats"> ■ 20 products with 120 items near to expired</div>
                <div className="nearly-stock-out-products product-stats"> ■ 30 products to be sold out</div>
                <div className="expired-products product-stats"> ■ 10 products with 100 items -products</div>
                <div className="damaged-products product-stats"> ■ 2 products with 3 items damaged</div>
                <div className="out-of-stock-products product-stats"> ■ 30 products out of stock</div>
                <Button className="mx-2" >See Reports </Button>
          <Button onClick={Allcato}>See Products </Button>
              </div>
          </div>
          
            {/* You can add additional content for each category here */}
            {/* For example, display products related to the category */}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    ));
  };
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showSeePurchasesModal, setShowSeePurchasesModal] = useState(false);

  const handleAddStockClick = () => setShowAddStockModal(true);
  const handleAddProductClick = () => setShowAddProductModal(true);
  const handleSeePurchasesClick = () => setShowSeePurchasesModal(true);

  const handleCloseModals = () => {
    setShowAddStockModal(false);
    setShowAddProductModal(false);
    setShowSeePurchasesModal(false);
  };

  const SeePurchasesModal = ({ show, handleClose }) => {
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
  const AddProductModal = ({ show, handleClose }) => {
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
  const AddStockModal = ({ show, handleClose }) => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add stock form */}
          <Form>
            {/* Include form fields for adding stock */}
            {/* For example, product selection, quantity, etc. */}
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
    <div className="main-product-components">
      <div className="search-component d-flex justify-content-between ">
        <div className="search-input mx-3 my-1">
          <FontAwesomeIcon icon={faSearch} className="ml-2 mx-2" />
          <input
            type="text"
            className="border-0"
            placeholder="Search Products"
          />
        </div>
        <div className="products-num-stats d-flex justify-content-around">
          <div className="products-purchase mx-3">• Purchased:200</div>
          <div className="products-sold mx-3">• Sold:100</div>
          <div className="products-stock mx-3">• In Stock:100</div>
        </div>
      </div>
      
      <div className="product-statuses row flex-wrap align-items-center">
        <div className="col-4 instock">
          <div className="instock-heading mx-4">In Stock</div>
          <hr />
          <div className="instock-details d-flex justify-content-around m-3">
            <div className="total-product-count mx-2">■ Total-Products-100</div>
            <div className="total-items-count mx-2">■ Total-Items-100</div>
          </div>
          <div className="nearly-completed ">
            <h6 className="mx-1 my-2">Nearly Completing </h6>
            <div className="d-flex mx-3">
              <div className="product-count mx-2">Products-100</div>
              <div className="items-count mx-2">Items-100</div>
            </div>
          </div>
          <div className="nearly-expiring ">
            <h6 className="mx-1 my-2">Nearly Expiring </h6>
            <div className="d-flex mx-3">
              <div className="product-count mx-2">Products-100</div>
              <div className="items-count mx-2">Items-100</div>
            </div>
          </div>
        </div>
        <div className="col-3">
          <div className="mb-3 out-of-stocks">
            <div className="instock-heading mx-2">Out of Stock</div>
            <hr />
            <div className="">
              <div className="product-count mx-2">Products-100</div>
              <div className="items-count mx-2">Items-100</div>
            </div>
          </div>

          <div className="expired">
            <div className="instock-heading mx-2">Expires, Damages</div>
            <hr />
            <div className="">
              <div className="product-count mx-2">Products-100</div>
              <div className="items-count mx-2">Items-100</div>
            </div>
          </div>
        </div>
        <div className="col-5 instock-graph d-flex justify-content-center"><DoughnutChart/></div>
      </div>
      <div className="product-page-buttons row">
      
      
      
        <div className="col-lg-2 col-md-2 col-sm-6 ">
          <Button onClick={Allcato}>See all products</Button>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-6">
        <Button onClick={handleAddStockClick}>Add Stock</Button>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-6">
        <Button onClick={handleAddProductClick}>Add New Product</Button>
        </div>
        <div className="col-lg-2 col-md-2 col-sm-6">
        <Button onClick={handleSeePurchasesClick}>See Purchases</Button>
        </div>
      </div>

      <div className="catogaries my-3 p-3 mx-2">
        <h3 className="all-catogaries-heading">All categories</h3>
        {/* Category list or selection */}
        <div className="accordion">{renderCategories()}</div>
      </div>

      <div className="High-trades ">
        {/* Top-selling products section */}
        high trades
      </div>

      <div className="recents">
        recents
        {/* Recently added or updated products section */}
      </div>
            {/* Modals */}
      <AddStockModal show={showAddStockModal} handleClose={handleCloseModals} />
      <AddProductModal show={showAddProductModal} handleClose={handleCloseModals} />
      <SeePurchasesModal show={showSeePurchasesModal} handleClose={handleCloseModals} />
    </div>
  );
};

export default Products;
