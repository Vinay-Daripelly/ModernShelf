import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/books`;

const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};


// const getBooks = async (pageNumber = 1) => {
//   const response = await axios.get(`${API_URL}?pageNumber=${pageNumber}`);
//   return response.data; 
// };
const getBooks = async (pageNumber = 1, search = '', genre = '') => {
  const response = await axios.get(`${API_URL}`, {
    params: { pageNumber, search, genre }
  });
  return response.data;
};
const getGenres = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  return response.data;
};

const getFeaturedBooks = async () => {
    const response = await axios.get(`${API_URL}/featured`);
    return response.data;
};


const getBookById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new book (protected)
const createBook = async (bookData) => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.post(API_URL, bookData, config);
  return response.data;
};

// Update a book (protected)
const updateBook = async (id, bookData) => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.put(`${API_URL}/${id}`, bookData, config);
  return response.data;
};

// Delete a book (protected)
const deleteBook = async (id) => {
  const config = { headers: getAuthHeaders() };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const bookService = {
  getBooks,
  getGenres,
  getFeaturedBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

export default bookService;