import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-gray-200">
      <Toaster position="top-center" reverseOrder={false} /> 
      <Navbar />
      <main className="flex-grow overflow-x-auto container mx-auto px-4 py-8">
        <Outlet /> 
      </main>
      <footer className="bg-gray-200 text-center p-4 dark:bg-gray-800 dark:text-gray-400">
        By ModernShop ©2025 
      </footer>
    </div>
  );
};

export default Layout;