// src/App.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const App = () => {
  const [product, setProduct] = useState({ productId: '', productName: '', price: '' });
  const [productList, setProductList] = useState([]);

  // Helper functions for cookie CRUD operations
  const createProduct = (productId, productName, price) => {
    const productData = { productId, productName, price };
    Cookies.set(`product_${productId}`, JSON.stringify(productData), { expires: 7 }); // Cookie expires in 7 days
    fetchProducts(); // Refresh the product list
  };

  const getProduct = (productId) => {
    const productData = Cookies.get(`product_${productId}`);
    if (productData) {
      return JSON.parse(productData);
    }
    return null;
  };

  const updateProduct = (productId, newProductName, newPrice) => {
    const updatedProduct = { productId, productName: newProductName, price: newPrice };
    Cookies.set(`product_${productId}`, JSON.stringify(updatedProduct), { expires: 7 });
    fetchProducts(); // Refresh the product list
  };

  const deleteProduct = (productId) => {
    Cookies.remove(`product_${productId}`);
    fetchProducts(); // Refresh the product list
  };

  // Fetch all products from cookies
  const fetchProducts = () => {
    const products = [];
    document.cookie.split(';').forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name.startsWith('product_')) {
        const productData = JSON.parse(decodeURIComponent(value));
        products.push(productData);
      }
    });
    setProductList(products);
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on initial render
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Product Management with Cookies
        </h1>

        {/* Create/Update Product Form */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Create/Update Product</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Product ID"
              value={product.productId}
              onChange={(e) => setProduct({ ...product, productId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              placeholder="Product Name"
              value={product.productName}
              onChange={(e) => setProduct({ ...product, productName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
            <div className="flex gap-4">
              <button
                onClick={() => createProduct(product.productId, product.productName, product.price)}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Create Product
              </button>
              <button
                onClick={() =>
                  updateProduct(product.productId, product.productName, product.price)
                }
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Update Product
              </button>
            </div>
          </div>
        </div>

        {/* Product List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Product List</h2>
          {productList.length === 0 ? (
            <p className="text-gray-600">No products found in cookies.</p>
          ) : (
            <ul className="space-y-4">
              {productList.map((product) => (
                <li
                  key={product.productId}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg shadow-sm"
                >
                  <span className="font-medium text-gray-800">
                    {product.productName} - ${product.price}
                  </span>
                  <button
                    onClick={() => deleteProduct(product.productId)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
