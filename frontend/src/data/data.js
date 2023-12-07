import React, { createContext, useContext, useState } from 'react';

const employees = [
    { user_id: 1, name: "Rajesh", dob: "1990-01-15", mail_id: "rajesh@example.com", password: "hashed_password", status: "owner", performance: 90, leaves: 5, date_of_join: "2018-05-20" },
    { user_id: 2, name: "Sara", dob: "1988-07-25", mail_id: "sara@example.com", password: "hashed_password", status: "manager", performance: 85, leaves: 3, date_of_join: "2019-02-10" },
    { user_id: 3, name: "John", dob: "1995-04-30", mail_id: "john@example.com", password: "hashed_password", status: "supervisor", performance: 78, leaves: 8, date_of_join: "2017-09-15" },
    { user_id: 4, name: "Alice", dob: "1992-11-08", mail_id: "alice@example.com", password: "hashed_password", status: "supervisor", performance: 92, leaves: 2, date_of_join: "2020-01-12" },
    { user_id: 5, name: "Bob", dob: "1987-06-20", mail_id: "bob@example.com", password: "hashed_password", status: "staff", performance: 80, leaves: 6, date_of_join: "2016-07-05" },
    { user_id: 6, name: "Eva", dob: "1993-09-18", mail_id: "eva@example.com", password: "hashed_password", status: "staff", performance: 88, leaves: 4, date_of_join: "2019-08-22" },
    { user_id: 7, name: "Alex", dob: "1985-03-12", mail_id: "alex@example.com", password: "hashed_password", status: "staff", performance: 95, leaves: 1, date_of_join: "2015-11-30" },
    { user_id: 8, name: "Mia", dob: "1991-12-05", mail_id: "mia@example.com", password: "hashed_password", status: "staff", performance: 75, leaves: 7, date_of_join: "2018-03-18" },
    { user_id: 9, name: "David", dob: "1989-08-28", mail_id: "david@example.com", password: "hashed_password", status: "staff", performance: 87, leaves: 3, date_of_join: "2017-06-10" },
    { user_id: 10, name: "Sophie", dob: "1994-05-07", mail_id: "sophie@example.com", password: "hashed_password", status: "staff", performance: 82, leaves: 5, date_of_join: "2016-09-28" },
];

const product_categories = [
    { product_category_id: 1, name: "Electronics" },
    { product_category_id: 2, name: "Textiles" },
    { product_category_id: 3, name: "Appliances" },
    { product_category_id: 4, name: "Furniture" },
    { product_category_id: 5, name: "Toys" },
    { product_category_id: 6, name: "Beauty" },
    { product_category_id: 7, name: "Grocery" },
    { product_category_id: 8, name: "Sports" },
    { product_category_id: 9, name: "Stationery" },
    { product_category_id: 10, name: "Jewelry" },
];

const products = [
    { product_id: 1, name: "Smartphone", product_category_id: 1, description: "High-end smartphone with advanced features", price: 699.99 },
    { product_id: 2, name: "Laptop", product_category_id: 1, description: "Powerful laptop for professional use", price: 1299.99 },
    { product_id: 3, name: "T-shirt", product_category_id: 2, description: "Cotton T-shirt for everyday wear", price: 19.99 },
    { product_id: 4, name: "Refrigerator", product_category_id: 3, description: "Large capacity refrigerator for home use", price: 899.99 },
    { product_id: 5, name: "Sofa", product_category_id: 4, description: "Comfortable sofa for the living room", price: 499.99 },
    { product_id: 6, name: "Toy Car", product_category_id: 5, description: "Remote-controlled toy car for kids", price: 29.99 },
    { product_id: 7, name: "Lipstick", product_category_id: 6, description: "Long-lasting matte lipstick in vibrant colors", price: 14.99 },
    { product_id: 8, name: "Rice", product_category_id: 7, description: "High-quality Basmati rice for cooking", price: 9.99 },
    { product_id: 9, name: "Tennis Racket", product_category_id: 8, description: "Professional tennis racket for sports enthusiasts", price: 79.99 },
    { product_id: 10, name: "Notebook", product_category_id: 9, description: "Spiral-bound notebook for writing and drawing", price: 4.99 },
];

const test_upload_product = [
    { product_id: 11, name: "Test Product 1", product_category_id: 10, description: "This is a test product description", price: 29.99 },
    { product_id: 12, name: "Test Product 2", product_category_id: 1, description: "Another test product", price: 19.99 },
    { product_id: 13, name: "Test Product 3", product_category_id: 2, description: "Yet another test product", price: 24.99 },
    { product_id: 14, name: "Test Product 4", product_category_id: 3, description: "Test product with different category", price: 14.99 },
    { product_id: 15, name: "Test Product 5", product_category_id: 4, description: "Test product with a different category", price: 34.99 },
    { product_id: 16, name: "Test Product 6", product_category_id: 5, description: "Another variation of a test product", price: 39.99 },
    { product_id: 17, name: "Test Product 7", product_category_id: 6, description: "More testing with product variations", price: 44.99 },
    { product_id: 18, name: "Test Product 8", product_category_id: 7, description: "A different kind of test product", price: 19.99 },
    { product_id: 19, name: "Test Product 9", product_category_id: 8, description: "Testing product variations further", price: 29.99 },
    { product_id: 20, name: "Test Product 10", product_category_id: 9, description: "Final test product for now", price: 9.99 },
];

const product_items = [
    { id: 1, product_id: 1, inventory_id: 1, damaged: 0, sold: 0 },
    { id: 2, product_id: 2, inventory_id: 2, damaged: 0, sold: 0 },
    { id: 3, product_id: 3, inventory_id: 3, damaged: 0, sold: 0 },
    { id: 4, product_id: 4, inventory_id: 4, damaged: 0, sold: 0 },
    { id: 5, product_id: 5, inventory_id: 5, damaged: 0, sold: 0 },
    { id: 6, product_id: 6, inventory_id: 6, damaged: 0, sold: 0 },
    { id: 7, product_id: 7, inventory_id: 7, damaged: 0, sold: 0 },
    { id: 8, product_id: 8, inventory_id: 8, damaged: 0, sold: 0},
    { id: 9, product_id: 9, inventory_id: 9, damaged: 0, sold: 0 },
    { id: 10, product_id: 10, inventory_id: 10, damaged: 0, sold: 0 },
];

const inventory = [
    { inventory_id: 1, product_id: 1, purchased_stock: 100, expiry: "2023-12-31", stock_expense: 2000.0, other_expense: 500.0, stock:100, date_of_purchase: "2023-01-15" },
    { inventory_id: 2, product_id: 2, purchased_stock:100, expiry: "2023-11-30", stock_expense: 1500.0, other_expense: 300.0, stock:100, date_of_purchase: "2022-08-25" },
    { inventory_id: 3, product_id: 3, purchased_stock:100, expiry: "2023-09-30", stock_expense: 500.0, other_expense: 100.0, stock:100, date_of_purchase: "2023-04-18" },
    { inventory_id: 4, product_id: 4, purchased_stock:100, expiry: "2023-10-15", stock_expense: 1800.0, other_expense: 400.0, stock:100, date_of_purchase: "2023-04-18" },
    { inventory_id: 5, product_id: 5, purchased_stock:100, expiry: "2023-11-20", stock_expense: 1200.0, other_expense: 200.0, stock:100, date_of_purchase: "2023-03-10" },
    { inventory_id: 6, product_id: 6, purchased_stock: 100, expiry: "2023-09-15", stock_expense: 2500.0, other_expense: 300.0, stock:100, date_of_purchase: "2023-06-28" },
    { inventory_id: 7, product_id: 7, purchased_stock:100, expiry: "2023-12-31", stock_expense: 800.0, other_expense: 100.0, stock:100, date_of_purchase: "2023-02-10" },
    { inventory_id: 8, product_id: 8, purchased_stock:100, expiry: "2023-11-10", stock_expense: 1600.0, other_expense: 200.0, stock:100, date_of_purchase: "2022-12-05" },
    { inventory_id: 9, product_id: 9, purchased_stock:100, expiry: "2023-10-05", stock_expense: 600.0, other_expense: 80.0, stock:100, date_of_purchase: "2023-07-18" },
    { inventory_id: 10, product_id: 10, purchased_stock:100, expiry: "2023-09-28", stock_expense: 1000.0, other_expense: 150.0, stock:100, date_of_purchase: "2023-04-30" },
];

const order = [
    { order_id: 1, total_price: 349.98, customer_id: 1 },
    { order_id: 2, total_price: 1599.98, customer_id: 2 },
    { order_id: 3, total_price: 59.97, customer_id: 3 },
    { order_id: 4, total_price: 899.99, customer_id: 4 },
    { order_id: 5, total_price: 524.98, customer_id: 5 },
    { order_id: 6, total_price: 1199.95, customer_id: 6 },
    { order_id: 7, total_price: 114.96, customer_id: 7 },
    { order_id: 8, total_price: 199.95, customer_id: 8 },
    { order_id: 9, total_price: 249.98, customer_id: 9 },
    { order_id: 10, total_price: 69.97, customer_id: 10 },
];

const sales = [
    { sale_id: 1, order_id: 1, product_id: 1, quantity: 10, product_price: 699.99, total_amount:6999.9, },
    { sale_id: 2, order_id: 2, product_id: 2, quantity: 10, product_price: 1299.99, total_amount:12999.9, },
    { sale_id: 3, order_id: 3, product_id: 3, quantity: 10, product_price: 19.99, total_amount:199.9, },
    { sale_id: 4, order_id: 4, product_id: 4, quantity: 10, product_price: 899.99, total_amount:8999.9, },
    { sale_id: 5, order_id: 5, product_id: 5, quantity: 10, product_price: 249.99, total_amount:2499.9, },
    { sale_id: 6, order_id: 6, product_id: 6, quantity: 10, product_price: 29.99, total_amount:299.9, },
    { sale_id: 7, order_id: 7, product_id: 7, quantity: 10, product_price: 14.99, total_amount:149.9, },
    { sale_id: 8, order_id: 8, product_id: 8, quantity: 10, product_price: 19.99, total_amount:199.9, },
    { sale_id: 9, order_id: 9, product_id: 9, quantity: 10, product_price: 79.99, total_amount:799.9, },
    { sale_id: 10, order_id: 10, product_id: 10, quantity: 10, product_price: 4.99, total_amount: 49.9,},
];

const customers = [
    { customer_id: 1, name: 'Michael Johnson', place: "New York", dob: "1982-03-15" },
    { customer_id: 2, name: 'Emily Davis', place: "Los Angeles", dob: "1990-12-22" },
    { customer_id: 3, name: 'Christopher Harris', place: "Chicago", dob: "1975-08-10" },
    { customer_id: 4, name: 'Jessica Wilson', place: "Houston", dob: "1988-05-28" },
    { customer_id: 5, name: 'Daniel Smith', place: "Phoenix", dob: "1995-11-18" },
    { customer_id: 6, name: 'Ava Johnson', place: "Philadelphia", dob: "1987-09-02" },
    { customer_id: 7, name: 'Mia Taylor', place: "San Antonio", dob: "1993-04-12" },
    { customer_id: 8, name: 'William Thomas', place: "San Diego", dob: "1980-07-08" },
    { customer_id: 9, name: 'Sophia Martinez', place: "Dallas", dob: "1991-01-25" },
    { customer_id: 10, name: 'Ethan Anderson', place: "San Jose", dob: "1984-06-30" },
];

const community_messages = [
    { message_id: 1, sender: 2, receiver: 1, viewed: false },
    { message_id: 2, sender: 3, receiver: 1, viewed: true },
    { message_id: 3, sender: 4, receiver: 2, viewed: false },
    { message_id: 4, sender: 5, receiver: 3, viewed: true },
    { message_id: 5, sender: 6, receiver: 4, viewed: false },
    { message_id: 6, sender: 7, receiver: 5, viewed: true },
    { message_id: 7, sender: 8, receiver: 6, viewed: false },
    { message_id: 8, sender: 9, receiver: 7, viewed: true },
    { message_id: 9, sender: 10, receiver: 8, viewed: false },
    { message_id: 10, sender: 1, receiver: 9, viewed: true },
];

const leaves = [
    { date: "2023-02-28", employee_id: 1, reason: "Vacation" },
    { date: "2023-04-15", employee_id: 2, reason: "Sick Leave" },
    { date: "2023-06-20", employee_id: 3, reason: "Personal" },
    { date: "2023-08-10", employee_id: 4, reason: "Family Emergency" },
    { date: "2023-10-05", employee_id: 5, reason: "Conference" },
    { date: "2023-11-30", employee_id: 6, reason: "Maternity Leave" },
    { date: "2024-01-12", employee_id: 7, reason: "Paternity Leave" },
    { date: "2024-03-05", employee_id: 8, reason: "Vacation" },
    { date: "2024-04-22", employee_id: 9, reason: "Sick Leave" },
    { date: "2024-06-18", employee_id: 10, reason: "Personal" },
];

const returns = [
    { return_id: 1, compensate: "replace", product_id: 3 },
    { return_id: 2, compensate: "refund", product_id: 6 },
    { return_id: 3, compensate: "replace", product_id: 8 },
    { return_id: 4, compensate: "refund", product_id: 10 },
    { return_id: 5, compensate: "replace", product_id: 2 },
    { return_id: 6, compensate: "refund", product_id: 5 },
    { return_id: 7, compensate: "replace", product_id: 7 },
    { return_id: 8, compensate: "refund", product_id: 9 },
    { return_id: 9, compensate: "replace", product_id: 1 },
    { return_id: 10, compensate: "refund", product_id: 4 },
];

const duties = [
    { staff_cat:"", work: "Assist customers with product inquiries", employee_id: 1, status: "active" },
    { staff_cat: "Support", work: "Handle customer complaints and issues", employee_id: 2, status: "inactive" },
    { staff_cat: "Sales", work: "Promote new products to customers", employee_id: 3, status: "active" },
    { staff_cat: "Inventory", work: "Manage stock levels and order new inventory", employee_id: 4, status: "active" },
    { staff_cat: "Support", work: "Provide technical support to customers", employee_id: 5, status: "inactive" },
    { staff_cat: "Sales", work: "Conduct sales presentations", employee_id: 6, status: "active" },
    { staff_cat: "Inventory", work: "Inspect and manage product quality", employee_id: 7, status: "active" },
    { staff_cat: "Support", work: "Respond to customer inquiries via phone and email", employee_id: 8, status: "inactive" },
    { staff_cat: "Sales", work: "Meet monthly sales targets", employee_id: 9, status: "active" },
    { staff_cat: "Inventory", work: "Organize and categorize incoming inventory", employee_id: 10, status: "active" },
];




// Create a context for the user
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [Employees, SetEmployees] = useState(employees);
    const [Product_categories, SetProduct_categories] = useState(product_categories);
    const [Products, SetProducts] = useState(products);
    const [Test_upload_product, SetTest_upload_product] = useState(test_upload_product);
    const [Product_items, SetProduct_items] = useState(product_items);
    const [Inventory, SetInventory] = useState(inventory);
    const [Order, SetOrder] = useState(order);
    const [Sales, SetSales] = useState(sales);
    const [Customers, SetCustomers] = useState(customers);
    const [Community_messages, SetCommunity_messages] = useState(community_messages);
    const [Leaves, SetLeaves] = useState(leaves);
    const [Returns, SetReturns] = useState(returns);
    const [Duties, SetDuties] = useState(duties);
    const [User,setUser]=useState({
        username:"",
        status:"",
        id:-1,
    });
    return (
        <UserContext.Provider value={{
            Employees, SetEmployees,
            Product_categories, SetProduct_categories,
            Products, SetProducts,
            Test_upload_product, SetTest_upload_product,
            Product_items, SetProduct_items,
            Inventory, SetInventory,
            Order, SetOrder,
            Sales, SetSales,
            Customers, SetCustomers,
            Community_messages, SetCommunity_messages,
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
