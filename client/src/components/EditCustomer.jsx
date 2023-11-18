// EditCustomer.js
import React, { useState, useEffect } from "react";
import { getCustomerDetails, updateCustomer } from "../services/apiService";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomer = ({ token }) => {
  const { customerId } = useParams();
  const [customerDetails, setCustomerDetails] = useState({
    first_name: "",
    last_name: "",
    street: "", 
    city: "",
    email: "",
    state: "",
    phone: "",
  });
  
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await getCustomerDetails(token, customerId);
        setCustomerDetails(response.customer);
      } catch (error) {
        setError("Error fetching customer details.");
      }
    };

    fetchCustomerDetails();
  }, [token, customerId]);

  const handleUpdateCustomer = async () => {
    try {
      await updateCustomer(token, customerId, {
        ...customerDetails,
        address: customerDetails.street,
      });
      // Handle successful customer update, maybe navigate back to the customer list screen
      navigate("/customer-list");
    } catch (error) {
      setError("Error updating customer.");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Edit Customer</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.first_name}
            onChange={(e) =>
              setCustomerDetails((prev) => ({
                ...prev,
                first_name: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.last_name}
            onChange={(e) =>
              setCustomerDetails((prev) => ({
                ...prev,
                last_name: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Street
          </label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.street}
            onChange={(e) =>
              setCustomerDetails((prev) => ({
                ...prev,
                street: e.target.value,
              }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            City
          </label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.city}
            onChange={(e) =>
              setCustomerDetails((prev) => ({ ...prev, city: e.target.value }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            State
          </label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.state}
            onChange={(e) =>
              setCustomerDetails((prev) => ({ ...prev, state: e.target.value }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.email}
            onChange={(e) =>
              setCustomerDetails((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md w-full"
            value={customerDetails.phone}
            onChange={(e) =>
              setCustomerDetails((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        </div>

        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleUpdateCustomer}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditCustomer;
