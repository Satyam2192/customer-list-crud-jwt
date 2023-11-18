import React, { useEffect, useState } from "react";
import { getCustomerList, deleteCustomer } from "../services/apiService";
import { NavLink } from "react-router-dom";

const CustomerList = ({ token }) => {
  const [customerList, setCustomerList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomerList = async () => {
      try {
        const response = await getCustomerList(token);
        setCustomerList(response.customers); // Use response.customers instead of response
      } catch (error) {
        setError("Error fetching customer list.");
      }
    };

    fetchCustomerList();
  }, [token]);

  const handleDelete = async (customerId) => {
    try {
      await deleteCustomer(token, customerId);
      setCustomerList((prevList) =>
        prevList.filter((customer) => customer._id !== customerId)
      );
      
    } catch (error) {
      setError("Error deleting customer.");
    }
  };
  

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Customer List</h2>
      <NavLink to="/add-customer">
        <button className="my-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
          Add User
        </button>
      </NavLink>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">First Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Address</th>
            <th className="border border-gray-300 p-2">City</th>
            <th className="border border-gray-300 p-2">State</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Phone</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {customerList.map((customer) => (
            <tr key={customer.uuid}>
              <td className="border border-gray-300 p-2">
                {customer.first_name}
              </td>
              <td className="border border-gray-300 p-2">
                {customer.last_name}
              </td>
              <td className="border border-gray-300 p-2">{customer.address}</td>
              <td className="border border-gray-300 p-2">{customer.city}</td>
              <td className="border border-gray-300 p-2">{customer.state}</td>
              <td className="border border-gray-300 p-2">{customer.email}</td>
              <td className="border border-gray-300 p-2">{customer.phone}</td>
              <td className="border border-gray-300 p-2">
                <button
                  className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(customer._id)}
                >
                  Delete
                </button>
                <NavLink to={`/edit-customer/${customer._id}`}>
                  
                  <button className="ml-2 mt-2 bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600">
                    Edit
                  </button>
                </NavLink>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
