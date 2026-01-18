import axios from 'axios';

const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export default fetchData;