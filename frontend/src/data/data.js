import React, { createContext, useContext, useState,useMemo,useEffect } from 'react';
import axios from 'axios';



// Create a context for the user
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [Employees, SetEmployees] = useState([]);
    const [Product_categories, SetProduct_categories] = useState([]);
    const [Products, SetProducts] = useState([]);
    const [Product_items, SetProduct_items] = useState();
    const [Inventory, SetInventory] = useState([]);
    const [Order, SetOrder] = useState([]);
    const [Sales, SetSales] = useState([]);
    const [Customers, SetCustomers] = useState([]);
    const [Leaves, SetLeaves] = useState([]);
    const [Returns, SetReturns] = useState([]);
    const [Duties, SetDuties] = useState([]);
    const [User,setUser]=useState({
        username:"",
        status:"",
        id:-1,
    });
    const apiEndpoints = useMemo(() => ({
        employees: "http://127.0.0.1:8000/employees/",
        productcategories: "http://127.0.0.1:8000/productcategories/",
        products: "http://127.0.0.1:8000/products/",
        productitems: "http://127.0.0.1:8000/productitems/",
        inventories: "http://127.0.0.1:8000/inventories/",
        orders: "http://127.0.0.1:8000/orders/",
        sales: "http://127.0.0.1:8000/sales/",
        customers: "http://127.0.0.1:8000/customers/",
        leaves: "http://127.0.0.1:8000/leaves/",
        returns: "http://127.0.0.1:8000/returns/",
        duties: "http://127.0.0.1:8000/duties/"
      }), []);
    
      useEffect(() => {
        const fetchData = async (endpoint) => {
          try {
            const response = await axios.get(apiEndpoints[endpoint]);
            const responseData = response.data;
    
            switch (endpoint) {
              case 'employees':
                SetEmployees(responseData);
                break;
              case 'productcategories':
                SetProduct_categories(responseData);
                break;
              case 'products':
                SetProducts(responseData);
                break;

              case 'productitems':
                SetProduct_items(responseData);
                break;
              case 'inventories':
                SetInventory(responseData);
                break;
              case 'orders':
                SetOrder(responseData);
                break;
              case 'sales':
                SetSales(responseData);
                break;
              case 'customers':
                SetCustomers(responseData);
                break;
              case 'leaves':
                SetLeaves(responseData);
                break;
              case 'returns':
                SetReturns(responseData);
                break;
              case 'duties':
                SetDuties(responseData);
                break;
              default:
                // Handle the case when the endpoint is not recognized
                break;
            }
    
          } catch (error) {
            console.error(`Error fetching data from ${endpoint}:`, error.message);
          }
        };
    
        // Fetch data from all endpoints
        Object.keys(apiEndpoints).forEach((endpoint) => {
          fetchData(endpoint);
        });
    
      }, [apiEndpoints]);
    
    


    return (
        <UserContext.Provider value={{
            Employees, SetEmployees,
            Product_categories, SetProduct_categories,
            Products, SetProducts,
            Product_items, SetProduct_items,
            Inventory, SetInventory,
            Order, SetOrder,
            Sales, SetSales,
            Customers, SetCustomers,
            Leaves, SetLeaves,
            Returns, SetReturns,
            Duties, SetDuties,
            User,setUser,
        }}>        
        {children}
        </UserContext.Provider>
    );
};

// Create a custom hook to consume the context
export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};
