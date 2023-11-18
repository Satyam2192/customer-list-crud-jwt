import React, { useState } from "react";
import { authenticateUser } from "../services/apiService";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Logging in with:", loginId, password);
      const token = await authenticateUser(loginId, password);
      console.log("Authentication successful. Token:", token);
      setToken(token);
      navigate("/customer-list"); // Redirect to customer list after successful login
    } catch (error) {
      console.error("Authentication failed:", error);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-200 p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login Page</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Login ID
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="mt-1 p-2 border rounded-md w-full"
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={handleLogin}
          >
            Submit
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
