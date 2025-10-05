# ModernShelf - A MERN Book Review Platform

[![Live Site](https://img.shields.io/badge/Live_Site-View%20App-brightgreen)](https://modernshelf-a-diigital-book-store.onrender.com/)
[![Live API](https://img.shields.io/badge/Live_API-View%20Base-blue)](https://modernshelf.onrender.com/)

ModernShelf is a comprehensive full-stack web application built from the ground up using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a complete platform for users to discover, add, and review their favorite books in a dynamic and responsive interface.

---

## ✨ Key Features

-   **Full User Authentication:** Secure registration and login with JWT for session management.
-   **Complete Book Management (CRUD):** Users can create, read, update, and delete books.
-   **Dynamic Review System (CRUD):** Users can add, edit, and delete their own reviews for any book.
-   **Ownership & Authorization:** Users can only edit or delete the books and reviews that they have personally created.
-   **Pagination:** The main book list is paginated to handle a large number of entries efficiently.
-   **Search & Filter:** The book list can be searched by title/author and filtered by genre. The genre list is dynamically generated from the database.
-   **Dynamic Ratings:** The average rating for each book is calculated and displayed in real-time.
-   **User Profiles:** A dedicated profile page shows all the books and reviews contributed by the logged-in user.
-   **Dark/Light Mode:** A theme toggle for user preference, with the choice saved in `localStorage`.
-   **Responsive Design:** A seamless experience on all devices, from mobile to desktop.
-   **User Feedback:** Integrated toast notifications for all major actions (login, logout, form submissions, errors).

---

## 💻 Tech Stack

-   **Frontend:** React, Vite, React Router, Tailwind CSS, Axios, React Hot Toast
-   **Backend:** Node.js, Express.js, MongoDB (with Mongoose)
-   **Authentication:** JSON Web Tokens (JWT), bcryptjs
-   **Deployment:** Render (Web Service for Backend, Static Site for Frontend)

---
Coding partner

Show thinking
Of course. Here is a comprehensive README.md file for your "ModernShelf" project, structured like a professional project document with all the necessary sections and using your specified folder names.

You can copy this entire text and paste it into your README.md file on GitHub.

Markdown

# ModernShelf - A MERN Book Review Platform

[![Live Site](https://img.shields.io/badge/Live_Site-View%20App-brightgreen)](https://modernshelf-a-diigital-book-store.onrender.com/)
[![Live API](https://img.shields.io/badge/Live_API-View%20Base-blue)](https://modernshelf.onrender.com/)

ModernShelf is a comprehensive full-stack web application built from the ground up using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a complete platform for users to discover, add, and review their favorite books in a dynamic and responsive interface.

---

## ✨ Key Features

-   **Full User Authentication:** Secure registration and login with JWT for session management.
-   **Complete Book Management (CRUD):** Users can create, read, update, and delete books.
-   **Dynamic Review System (CRUD):** Users can add, edit, and delete their own reviews for any book.
-   **Ownership & Authorization:** Users can only edit or delete the books and reviews that they have personally created.
-   **Pagination:** The main book list is paginated to handle a large number of entries efficiently.
-   **Search & Filter:** The book list can be searched by title/author and filtered by genre. The genre list is dynamically generated from the database.
-   **Dynamic Ratings:** The average rating for each book is calculated and displayed in real-time.
-   **User Profiles:** A dedicated profile page shows all the books and reviews contributed by the logged-in user.
-   **Dark/Light Mode:** A theme toggle for user preference, with the choice saved in `localStorage`.
-   **Responsive Design:** A seamless experience on all devices, from mobile to desktop.
-   **User Feedback:** Integrated toast notifications for all major actions (login, logout, form submissions, errors).

---

## 💻 Tech Stack

-   **Frontend:** React, Vite, React Router, Tailwind CSS, Axios, React Hot Toast
-   **Backend:** Node.js, Express.js, MongoDB (with Mongoose)
-   **Authentication:** JSON Web Tokens (JWT), bcryptjs
-   **Deployment:** Render (Web Service for Backend, Static Site for Frontend)

---

## 📂 Folder Structure

The project is organized into a monorepo structure with two main folders:

/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── data/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── seeder.js
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
└── README.md  


---

## 📖 API Documentation

The backend provides the following RESTful API endpoints:

| Endpoint                       | Method   | Description                                       | Protected |
| ------------------------------ | -------- | ------------------------------------------------- | --------- |
| `/api/users/register`          | `POST`   | Register a new user                               | No        |
| `/api/users/login`             | `POST`   | Authenticate a user and get a token               | No        |
| `/api/users/profile/mybooks`   | `GET`    | Get all books added by the logged-in user         | Yes       |
| `/api/users/profile/myreviews` | `GET`    | Get all reviews written by the logged-in user     | Yes       |
| `/api/books`                   | `GET`    | Get all books (paginated, searchable, filterable) | No        |
| `/api/books`                   | `POST`   | Add a new book                                    | Yes       |
| `/api/books/featured`          | `GET`    | Get 4 featured books for the homepage             | No        |
| `/api/books/categories`        | `GET`    | Get all unique genres                             | No        |
| `/api/books/:id`               | `GET`    | Get a single book by its ID                       | No        |
| `/api/books/:id`               | `PUT`    | Update a book                                     | Yes       |
| `/api/books/:id`               | `DELETE` | Delete a book                                     | Yes       |
| `/api/reviews`                 | `POST`   | Add a new review to a book                        | Yes       |
| `/api/reviews/:id`             | `PUT`    | Update a review                                   | Yes       |
| `/api/reviews/:id`             | `DELETE` | Delete a review                                   | Yes       |

---

## 🚀 How to Run Locally

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Vinay-Daripelly/ModernShelf.git](https://github.com/Vinay-Daripelly/ModernShelf.git)
    cd ModernShelf
    ```
2.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    # Create a .env file and add your MONGO_URI and JWT_SECRET
    npm run dev
    ```
3.  **Setup Frontend:** (In a new terminal)
    ```bash
    cd frontend
    npm install
    # Create a .env file and add VITE_API_BASE_URL=http://localhost:5000
    npm run dev
    ```

---

## ☁️ Deployment

The application is deployed on **Render** as two separate services:
-   The **backend** is deployed as a **Web Service**.
-   The **frontend** is deployed as a **Static Site**, which communicates with the live backend API via an environment variable.
