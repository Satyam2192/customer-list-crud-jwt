// apiService.js
const apiUrl = 'http://localhost:7000/api/v1/sunbase/portal/api';

export const authenticateUser = async (loginId, password) => {
  try {
    const response = await fetch(`${apiUrl}/assignment_auth.jsp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login_id: loginId,
        password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const accessToken = data.access_token;

      if (accessToken) {
        return accessToken;
      } else {
        console.error('Authentication failed: Access token not found in the response', data);
        throw new Error('Authentication failed: Access token not found in the response');
      }
    } else {
      const errorData = await response.json();
      console.error('Authentication failed:', errorData);
      throw new Error(`Authentication failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Authentication failed:', error);
    throw new Error(`Authentication failed: ${error.message}`);
  }
};



export const getCustomerList = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/assignment.jsp`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Remove Content-Type header for GET requests
    });

    console.log('Response status:', response.status); // Add this line
    console.log('Response headers:', response.headers);

    if (response.ok) {
      try {
        // Attempt to parse JSON
        const data = await response.json();
        return data;
      } catch (jsonError) {
        console.error('Error parsing JSON:', jsonError);
        throw new Error('Error parsing JSON');
      }
    } else {
      // Handle non-OK responses
      const errorData = await response.json().catch(() => null); // Handle potential JSON parsing error
      console.error('Error fetching customer list:', errorData);
      throw new Error(`Error fetching customer list: ${errorData ? errorData.message || response.statusText : response.statusText}`);
    }
  } catch (fetchError) {
    // Handle fetch errors
    console.error('Fetch error:', fetchError);
    throw new Error('Error fetching customer list');
  }
};





export const deleteCustomer = async (token, uuid) => {
  try {
    const response = await fetch(`${apiUrl}/assignment.jsp/${uuid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error deleting customer');
    }
  } catch (error) {
    throw new Error('Error deleting customer');
  }
};


export const createCustomer = async (token, customerDetails) => {
  try {
    const response = await fetch(`${apiUrl}/assignment.jsp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cmd: 'create',
        ...customerDetails,
      }),
    });

    if (!response.ok) {
      throw new Error('Error creating customer');
    }
  } catch (error) {
    throw new Error('Error creating customer');
  }
};


export const getCustomerDetails = async (token, customerId) => {
  try {
    const response = await fetch(`${apiUrl}/assignment.jsp/${customerId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Your logic to handle the response and return customer details
      return data;
    } else {
      // Handle non-OK responses
      throw new Error(`Error fetching customer details: ${response.statusText}`);
    }
  } catch (error) {
    // Handle fetch errors
    console.error('Fetch error:', error);
    throw new Error('Error fetching customer details');
  }
};



export const updateCustomer = async (token, customerId, updatedDetails) => {
  try {
    const response = await fetch(`${apiUrl}/assignment.jsp/${customerId}`, {
      method: 'PUT', // or 'PATCH' depending on your API
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...updatedDetails,
      }),
    });

    if (!response.ok) {
      throw new Error('Error updating customer');
    }
  } catch (error) {
    throw new Error('Error updating customer');
  }
};