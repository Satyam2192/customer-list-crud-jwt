// App.js
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import CustomerList from "./components/CustomerList";
import AddCustomer from "./components/AddCustomer";
import EditCustomer from "./components/EditCustomer";
const App = () => {
  const [token, setToken] = useState(null);

  return (
    <BrowserRouter>
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/login"
            element={
              !token ? (
                <Login setToken={setToken} />
              ) : (
                <Navigate to="/customer-list" />
              )
            }
          />
          <Route
            path="/customer-list"
            element={
              token ? <CustomerList token={token} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/add-customer"
            element={
              token ? <AddCustomer token={token} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/edit-customer/:customerId"
            element={
              token ? <EditCustomer token={token} /> : <Navigate to="/login" />
            }
          />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
