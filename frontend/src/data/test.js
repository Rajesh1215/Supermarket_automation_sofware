// import React, { useEffect } from 'react';
// import { useUserContext } from './data';   // Import your context hook

const ProductFilter = () => {
//   const { Product_items, Inventory } = useUserContext();

//   const filterProductItems = () => {
//     // Check if Product_items and Inventory are available
//     if (!Product_items || !Inventory) {
//       return {
//         unsoldCheckedCount: 0,
//         nearExpiryCount: 0,
//         nearlySoldOutCount: 0,
//       };
//     }
  
//     // Filter product items that are not sold and not checked
//     const unsoldCheckedItems = Product_items.filter(item => !item.sold && item.verified);
  
//     // Find count of unsold and Checked items
//     const unsoldCheckedCount = unsoldCheckedItems.length;
  
//     // Find products near expiry
//     const nearExpiryProducts = Inventory.filter(item => {
//       const today = new Date();
//       const expiryDate = new Date(item.expiry);
//       const daysUntilExpiry = Math.floor((expiryDate - today) / (1000 * 60 * 60 * 24));
//       return daysUntilExpiry <= 7;  // Assuming "near expiry" means within a week
//     });
  
//     // Find count of products near expiry
//     const nearExpiryCount = nearExpiryProducts.length;
  
//     // Find products having less than 2 items (nearly sold out)
    
//   // Find product ids with less than 2 items (nearly sold out)
//   const productsWithFewItems = {};
//   Product_items.forEach(item => {
//     const productId = item.product;
//     productsWithFewItems[productId] = (productsWithFewItems[productId] || 0) + 1;
//   });

//   // Find product ids with less than 2 items
//   const nearlySoldOutProductIds = Object.keys(productsWithFewItems).filter(
//     productId => productsWithFewItems[productId] < 100)
  
//     // Find count of nearly sold out products
//     const nearlySoldOutCount = nearlySoldOutProductIds.length;
  
//     return {
//       unsoldCheckedCount,
//       nearExpiryCount,
//       nearlySoldOutCount,
//     };
//   };
  

//   const {
//     unsoldCheckedCount,
//     nearExpiryCount,
//     nearlySoldOutCount,
//   } = () => filterProductItems();

//   useEffect(() => {
//     console.log('Unsold and checked Items Count:', unsoldCheckedCount);
//     console.log('Products Near Expiry Count:', nearExpiryCount);
//     console.log('Nearly Sold Out Products Count:', nearlySoldOutCount);
//   }, [unsoldCheckedCount, nearExpiryCount, nearlySoldOutCount]);

  return (
    <div>
      {/* Render your component or UI here */}
    </div>
  );
};

export default ProductFilter;
