import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import bookService from '../services/bookService';
import toast from 'react-hot-toast';

const EditBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookService.getBookById(id);
        setFormData({
          title: data.title,
          author: data.author,
          description: data.description,
          genre: data.genre,
          publishedYear: data.publishedYear,
        });
      } catch (error) {
        toast.error('Failed to fetch book data.');
        navigate('/');
      }
    };
    fetchBook();
  }, [id, navigate]);
  
  const { title, author, description, genre, publishedYear } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookService.updateBook(id, formData);
      toast.success('Book updated successfully!');
      navigate(`/books/${id}`);
    } catch (error) {
      toast.error('Failed to update book.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Book</h1>
      {/* Add dark mode class to form */}
      <form onSubmit={onSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md dark:bg-gray-800">
        <div>
          {/* Add dark mode class to label */}
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
          {/* Add dark mode classes to input */}
          <input type="text" name="title" id="title" value={title} onChange={onChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
          <input type="text" name="author" id="author" value={author} onChange={onChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea name="description" id="description" value={description} onChange={onChange} required rows="4" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
        </div>
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Genre</label>
          <input type="text" name="genre" id="genre" value={genre} onChange={onChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
        </div>
        <div>
          <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Published Year</label>
          <input type="number" name="publishedYear" id="publishedYear" value={publishedYear} onChange={onChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"/>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBookPage;