import React, { useState } from 'react';
import { createCustomer } from '../services/apiService';
import { NavLink, useNavigate } from 'react-router-dom';

const AddCustomer = ({ token }) => {
  const [customerDetails, setCustomerDetails] = useState({
    first_name: '',
    last_name: '',
    street: '',
    city: '',
    email: '',
    address: '',
    state: '',
    phone: '',
  });
  const [error, setError] = useState('');

  const handleCreateCustomer = async () => {
    try {
      await createCustomer(token, {
        ...customerDetails,
        address: customerDetails.street,
      });
      useNavigate("/customer-list")
      // Handle successful customer creation, maybe navigate back to the customer list screen
    } catch (error) {
      setError('Error creating customer.');
      useNavigate("/customer-list")
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Add a new customer</h2>
      <NavLink to="/customer-list">
        <button className="my-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
          Customer List
        </button>
      </NavLink>
      {error && <p className="text-red-500 mb-4">{"User Added"}</p>}
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">First Name</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.first_name}
            onChange={(e) => setCustomerDetails((prev) => ({ ...prev, first_name: e.target.value }))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Last Name</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.last_name}
            onChange={(e) => setCustomerDetails((prev) => ({ ...prev, last_name: e.target.value }))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Street</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.street}
            onChange={(e) => setCustomerDetails((prev) => ({ ...prev, street: e.target.value }))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">City</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.city}
            onChange={(e) => setCustomerDetails((prev) => ({ ...prev, city: e.target.value }))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">State</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.state}
            onChange={(e) => setCustomerDetails((prev) => ({ ...prev, state: e.target.value }))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.email}
            onChange={(e) => setCustomerDetails((prev) => ({ ...prev, email: e.target.value }))}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Phone</label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.phone}
            onChange={(e) => setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        <button
          type="button"
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          onClick={handleCreateCustomer}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCustomer;
