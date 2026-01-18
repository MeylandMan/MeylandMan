import axios from 'axios';

const fetchData = async (endpoint, params = {}) => {
  try {
    const route = import.meta.env.VITE_AXIOS_BASE_URL || 'http://localhost:8080';
    const response = await axios.get(`${route}/api/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export default fetchData;