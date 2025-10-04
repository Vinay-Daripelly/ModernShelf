
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/reviews`;

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

const createReview = async (reviewData) => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.post(API_URL, reviewData, config);
  return response.data;
};
const updateReview = async (id, reviewData) => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.put(`${API_URL}/${id}`, reviewData, config);
  return response.data;
};

// Delete a review
const deleteReview = async (id) => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const reviewService = {
  createReview,
  updateReview,
  deleteReview,
};

export default reviewService;
