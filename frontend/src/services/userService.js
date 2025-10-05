import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/users/profile`;

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

// Get books added by the current user
const getMyBooks = async () => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.get(`${API_URL}/mybooks`, config);
  return response.data;
};

// Get reviews written by the current user
const getMyReviews = async () => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.get(`${API_URL}/myreviews`, config);
  return response.data;
};

const userService = {
  getMyBooks,
  getMyReviews,
};

export default userService;