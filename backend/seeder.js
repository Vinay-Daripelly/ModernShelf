// seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const Book = require('./models/Book.js');
const User = require('./models/User.js');
const books = require('./data/books.js');

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Book.deleteMany();
    await User.deleteMany();

    // Create a sample admin user
    const createdUsers = await User.insertMany([
        {
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123' // This will be hashed automatically by your User model
        }
    ]);

    const adminUser = createdUsers[0]._id;

    // Add the admin user's ID to each book
    const sampleBooks = books.map(book => {
      return { ...book, addedBy: adminUser };
    });

    // Insert the book data
    await Book.insertMany(sampleBooks);

    console.log('Data Imported Successfully! ✅');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
    try {
        await connectDB();
        await Book.deleteMany();
        await User.deleteMany();
        console.log('Data Destroyed Successfully! ❌');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`);
        process.exit(1);
    }
}

// Check for command line arguments to decide whether to import or destroy data
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}