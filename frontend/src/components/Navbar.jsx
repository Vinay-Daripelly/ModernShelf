import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaBook, FaUserCircle, FaPlus } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const { user, logout } = useAuth();
  const activeLinkClass = 'text-red-500 font-bold';
  const inactiveLinkClass = 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white';

  return (
    <nav className="bg-white shadow-md dark:bg-gray-800 dark:border-b dark:border-gray-700">
      <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto justify-between">
          <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
            ModernShelf
          </Link>
          <div className="flex items-center space-x-6">
            <NavLink to="/" end className={({ isActive }) => `flex items-center ${isActive ? activeLinkClass : inactiveLinkClass}`}><FaHome className="mr-2" /><span>Home</span></NavLink>
            <NavLink to="/books" end className={({ isActive }) => `flex items-center ${isActive ? activeLinkClass : inactiveLinkClass}`}><FaBook className="mr-2" /><span>Books</span></NavLink>
            {user && (<NavLink to="/add-book" className={({ isActive }) => `flex items-center ${isActive ? activeLinkClass : inactiveLinkClass}`}><FaPlus className="mr-2" /><span>Add Book</span></NavLink>)}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          {user ? (
            <>
              <Link to="/profile" className={inactiveLinkClass}>
                <FaUserCircle className="h-6 w-6" />
              </Link>
              <span className="text-gray-800 hidden md:inline dark:text-gray-200">
                Hello, {user.name}
              </span>
              <button onClick={logout} className="bg-gray-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;