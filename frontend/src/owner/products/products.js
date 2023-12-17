import React,{useState,useEffect} from "react";
import "./products.css";
import { useNavigate } from "react-router-dom";
import { Button, Accordion , Modal,Table  } from "react-bootstrap";
import DoughnutChart,{DoughnutChartProCatogary} from "../charts/doughnut.js";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Products = () => {
  const navigate = useNavigate();
  const Allcato = () => {
    navigate("catogaries");
  };
  // const [productCategories, setProductCategories] = useState([]);
  const [statisticsData, setStatisticsData] = useState([]);
  const [catogoryData, setcatogoryData] = useState([]);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/productcategories/');
        // setProductCategories(response.data); // Assuming the API response is an array of product categories
        const fetchDataCatPromises = response.data.map(async (category) => {
          const response = await axios.get(`http://127.0.0.1:8000/get_category_details/${category.product_category_id}/`);
          const mergedCategory = {
            ...category,
            ...response.data,
          };
    
          return mergedCategory;
        });
        const apiData = await Promise.all(fetchDataCatPromises);
        setcatogoryData(apiData);
      } catch (error) {
        console.error('Error fetching product categories:', error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/statistics/');
        setStatisticsData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
    // const fetchDataCat = async () => {
    //   try {
    //     const fetchDataCatPromises = productCategories.map(async (category) => {
    //       const response = await axios.get(`http://127.0.0.1:8000/get_category_details/${category.product_category_id}/`);
    //       return response.data;
    //     });

    //     const apiData = await Promise.all(fetchDataCatPromises);

    //     setData(apiData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };

    fetchData();
    fetchProductCategories();
  }, []);


  const renderCategories = () => {

    return catogoryData.map((category) => (
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
                <div className="good-stock-products product-stats"> ■ Products with good stock-{category.good_stock_products.length}</div>
                <div className="nearly-expiring-products product-stats"> ■ Nearly expiring products-{category.nearly_expired_products.length}</div>
                <div className="nearly-stock-out-products product-stats"> ■ Nearly sold-out products{category.nearly_sold_out_products.length}</div>
                <div className="expired-products product-stats"> ■ Expired products-{category.expired_products.length}</div>
                {/* <div className="damaged-products product-stats"> ■ 2 products with 3 items damaged</div> */}
                <div className="out-of-stock-products product-stats"> ■ Out of stock products-{category.out_of_stock_products.length}</div>
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
    const [inventory, setInventory] = useState([]);
  
    useEffect(() => {
      // Fetch inventory data
      axios.get('http://127.0.0.1:8000/inventories/')
        .then(response => {
          setInventory(response.data);
        })
        .catch(error => {
          console.error('Error fetching inventory:', error);
        });
    }, [show]); // Fetch data when the modal is shown
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>See Purchases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Inventory ID</th>
                <th>Stock Status</th>
                <th>Purchased Stock</th>
                <th>Expiry</th>
                <th>Stock Expense</th>
                <th>Other Expense</th>
                <th>Stock</th>
                <th>Date of Purchase</th>
                <th>Product ID</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.inventory_id}>
                  <td>{item.inventory_id}</td>
                  <td>{item.stock_status}</td>
                  <td>{item.purchased_stock}</td>
                  <td>{item.expiry}</td>
                  <td>{item.stock_expense}</td>
                  <td>{item.other_expense}</td>
                  <td>{item.stock}</td>
                  <td>{item.date_of_purchase}</td>
                  <td>{item.product}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
          <ProductForm/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    );
  };

 const ProductForm = () => {
    const [categories, setCategories] = useState([]);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
  
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/productcategories/')
        .then(response => {
          setCategories(response.data);
        })
        .catch(error => {
          console.error('Error fetching categories:', error);
        });
    }, []);
  
    const initialValues = {
      name: '',
      description: '',
      price: '',
      product_category: '',
      newCategory: '',
    };
  
    const validationSchema = Yup.object({
      name: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      price: Yup.number().required('Required').positive('Price must be positive'),
      product_category: Yup.string().required('Required'),
      newCategory: Yup.string().when('product_category', {
        is: 'newCategory',
        then: Yup.string().required('Required'),
      }),
    });
  
    const onSubmit = (values) => {
      const productData = {
        name: values.name,
        description: values.description,
        price: values.price,
        product_category: values.product_category === 'newCategory' ? values.newCategory : values.product_category,
      };
  
      axios.post('http://127.0.0.1:8000/products/', productData)
        .then(response => {
          console.log('Product created successfully:', response.data);
          setShowProductModal(false);
          handleCloseModals();
        })
        .catch(error => {
          console.error('Error creating product:', error);
        });
    };
  
    const handleCloseProductModal = () => setShowProductModal(false);
  
    const handleShowCategoryModal = () => setShowCategoryModal(true);
    const handleCloseCategoryModal = () => setShowCategoryModal(false);
  
    const handleAddCategory = (values, actions) => {
      axios.post('http://127.0.0.1:8000/productcategories/', { name: values.newCategory })
        .then(response => {
          console.log('Category created successfully:', response.data);
          setCategories(prevCategories => [...prevCategories, response.data]);
          actions.setFieldValue('newCategory', '');
          handleCloseCategoryModal();
        })
        .catch(error => {
          console.error('Error creating category:', error);
        });
    };
  
    return (
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <label>Name:</label>
            <Field type="text" name="name" className="m-2" />
            <ErrorMessage name="name" component="div" />
            <br/>
            <label>Description:</label>
            <Field type="text" name="description" />
            <ErrorMessage name="description" component="div" />
            <br/>
            <label>Price:</label>
            <Field type="text" name="price" className="m-2" />
            <ErrorMessage name="price" component="div" />
            <br/>
            <label>Product Category:</label>
            <Field as="select" name="product_category" className="m-2" >
              <option value="" disabled>Select a category</option>
              {categories.map(category => (
                <option key={category.product_category_id} value={category.product_category_id}>{category.name}</option>
              ))}
            </Field>
            <ErrorMessage name="product_category" component="div" />
            <br/>
            {initialValues.product_category === 'newCategory' && (
              <>
                <label>New Category Name:</label>
                <Field type="text" name="newCategory" className="m-2" />
                <ErrorMessage name="newCategory" component="div" />
              </>
            )}
            <br/>

            <Button type="button" className="mx-3" onClick={handleShowCategoryModal}>
              Add New Category
            </Button>
  
            <Button type="submit">Create Product</Button>
          </Form>
        </Formik>
  
        <Modal show={showProductModal} onHide={handleCloseProductModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form>
                <label>Name:</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="div" />
  
                <label>Description:</label>
                <Field type="text" name="description" />
                <ErrorMessage name="description" component="div" />
  
                <label>Price:</label>
                <Field type="text" name="price" />
                <ErrorMessage name="price" component="div" />
  
                <label>Product Category:</label>
                <Field as="select" name="product_category">
                  <option value="" disabled>Select a category</option>
                  {categories.map(category => (
                    <option key={category.product_category_id} value={category.product_category_id}>{category.name}</option>
                  ))}
                  <option value="newCategory">Add New Category</option>
                </Field>
                <ErrorMessage name="product_category" component="div" />
  
                {initialValues.product_category === 'newCategory' && (
                  <>
                    <label>New Category Name:</label>
                    <Field type="text" name="newCategory" />
                    <ErrorMessage name="newCategory" component="div" />
                  </>
                )}
  
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Formik>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProductModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
  
        <Modal show={showCategoryModal} onHide={handleCloseCategoryModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{ newCategory: '' }}
              validationSchema={Yup.object({
                newCategory: Yup.string().required('Required'),
              })}
              onSubmit={(values, actions) => handleAddCategory(values, actions)}
            >
              <Form>
                <label>New Category Name:</label>
                <Field type="text" name="newCategory" />
                <ErrorMessage name="newCategory" component="div" />
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Form>
            </Formik>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseCategoryModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  
  const InventoryForm = ({ onClose }) => {
    const [productList, setProductList] = useState([]);
  
    useEffect(() => {
      // Fetch product names from the API
      axios.get('http://127.0.0.1:8000/products/')
        .then(response => {
          setProductList(response.data);
        })
        .catch(error => {
          console.error('Error fetching product names:', error);
        });
    }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount
  
    const initialValues = {
      product: '',
      stock_status: 'in stock',
      purchased_stock: '',
      expiry: '',
      stock_expense: '',
      other_expense: '',
      stock: '',
      date_of_purchase: '',
    };
  
    const validationSchema = Yup.object({
      product: Yup.number().required('Select a product'),
      stock_status: Yup.string().required('Select a stock status'),
      purchased_stock: Yup.number().required('Enter purchased stock'),
      expiry: Yup.date().required('Enter expiry date'),
      stock_expense: Yup.number().required('Enter stock expense'),
      other_expense: Yup.number().required('Enter other expense'),
      stock: Yup.number().required('Enter stock'),
      date_of_purchase: Yup.date().required('Enter date of purchase'),
    });
  
    const onSubmit = (values) => {
      // Make a POST request to create an inventory record
      axios.post('http://127.0.0.1:8000/inventories/', values)
        .then(response => {
          console.log('Inventory record created successfully:', response.data);
          // Close the modal
          onClose();
        })
        .catch(error => {
          console.error('Error creating inventory record:', error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server responded with status code:', error.response.status);
            console.error('Response data:', error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from the server');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up the request:', error.message);
          }
        });
    };
    
  
    return (
      <div>
        <h2>Create Inventory Record</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <label>
                Product:
                <Field
                  as="select"
                  name="product"
                  required
                >
                  <option value="" disabled>Select a product</option>
                  {productList.map(product => (
                    <option key={product.product_id} value={product.product_id}>
                      {product.name}
                    </option>
                  ))}
                </Field>
              </label>
              <ErrorMessage name="product" component="div" />
            </div>
            <br />
            <div>
              <label>
                Stock Status:
                <Field
                  as="select"
                  name="stock_status"
                  required
                >
                  <option value="" disabled>Select a stock status</option>
                  <option value="sold">Sold</option>
                  <option value="in stock">In Stock</option>
                  <option value="have to add">Have to Add</option>
                </Field>
              </label>
              <ErrorMessage name="stock_status" component="div" />
            </div>
            <br />
            <div>
              <label>
                Purchased Stock:
                <Field
                  type="number"
                  name="purchased_stock"
                  required
                />
              </label>
              <ErrorMessage name="purchased_stock" component="div" />
            </div>
            <br />
            <div>
              <label>
                Expiry:
                <Field
                  type="date"
                  name="expiry"
                  required
                />
              </label>
              <ErrorMessage name="expiry" component="div" />
            </div>
            <br />
            <div>
              <label>
                Stock Expense:
                <Field
                  type="number"
                  name="stock_expense"
                  required
                />
              </label>
              <ErrorMessage name="stock_expense" component="div" />
            </div>
            <br />
            <div>
              <label>
                Other Expense:
                <Field
                  type="number"
                  name="other_expense"
                  required
                />
              </label>
              <ErrorMessage name="other_expense" component="div" />
            </div>
            <br />
            <div>
              <label>
                Stock:
                <Field
                  type="number"
                  name="stock"
                  required
                />
              </label>
              <ErrorMessage name="stock" component="div" />
            </div>
            <br />
            <div>
              <label>
                Date of Purchase:
                <Field
                  type="date"
                  name="date_of_purchase"
                  required
                />
              </label>
              <ErrorMessage name="date_of_purchase" component="div" />
            </div>
            <br />
            <button type="submit">Create Inventory Record</button>
          </Form>
        </Formik>
      </div>
    );
  };
  
  const AddStockModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Use the InventoryForm component for adding a new product */}
        <InventoryForm onClose={handleClose} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {/* Remove the Save Changes button as it is handled in the InventoryForm */}
      </Modal.Footer>
    </Modal>
  );
};
  return (
    <div className="main-product-components">
      <div className="search-component d-flex justify-content-between ">
        <div className="sear mx-3 my-1">
          <h3>Products Details</h3>
        </div>
        <div className="products-num-stats d-flex justify-content-around">
            <div className="products-purchase mx-3">• Purchased: {statisticsData.total_items}</div>
            <div className="products-sold mx-3">• Sold: {statisticsData.sold_items}</div>
            <div className="products-stock mx-3">• In Stock: {statisticsData.verified_items}</div>
          </div>

      </div>
      
      <div className="product-statuses row flex-wrap align-items-center">
        <div className="col-4 instock">
          <div className="instock-heading mx-4">In Stock</div>
          <hr />
          <div className="instock-details d-flex justify-content-around m-3">
            <div className="total-product-count mx-2">■ Total-Products-{statisticsData.total_products}</div>
            <div className="total-items-count mx-2">■ Total-Items-{statisticsData.total_items}</div>
          </div>
          <div className="nearly-completed ">
            <h5 className="mx-1 my-2">Nearly Completing </h5>
            <div className="d-flex mx-3">
              <div className="product-count mx-2">Products-{statisticsData.nearly_sold_out_products}</div>
              <div className="items-count mx-2">Items-100</div>
            </div>
          </div>
          <div className="nearly-expiring ">
            <h5 className="mx-1 my-2">Nearly Expiring </h5>
            <div className="d-flex mx-3">
              <div className="product-count mx-2">Products-{ statisticsData.nearly_expiring_products}</div>
              <div className="items-count mx-2">Items-100</div>
            </div>
            
          </div>
        </div>
        <div className="col-3">
          <div className="mb-1 out-of-stocks">
            <div className="instock-heading mx-2">Inventory</div>
            <hr />
            <div className="m-1 text-danger">
            Haven't Add-{ statisticsData.Have_to_add.Total_stock}
            </div>
            <div className="m-1 text-danger"> Unverified items-{statisticsData.unverified_items} </div>
            <div className="product-count mx-2">Out of stock-{statisticsData.out_of_stock}</div>
          </div>

          <div className="expired">
          <div className="instock-heading mx-2">Expires and Damages</div>
            <hr />
            <div className="">
            
              <div className="product-count mx-2">Products-{statisticsData.expired_products}</div>
              <div className="items-count mx-2">Items-{statisticsData.expired_items}</div>
            </div>
          </div>
        </div>
        <div className="col-5 instock-graph d-flex justify-content-center"><ItemCategoryChart/></div>
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

            {/* Modals */}
      <AddStockModal show={showAddStockModal} handleClose={handleCloseModals} />
      <AddProductModal show={showAddProductModal} handleClose={handleCloseModals} />
      <SeePurchasesModal show={showSeePurchasesModal} handleClose={handleCloseModals} />
    </div>
  );
};


const ItemCategoryChart = () => {
  const [itemsByCategory, setItemsByCategory] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/statistics/');
        setItemsByCategory(response.data.items_by_category);
      } catch (error) {
        console.error('Error fetching item category data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {itemsByCategory ? (
        <DoughnutChartProCatogary itemsByCategory={itemsByCategory} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Products;
