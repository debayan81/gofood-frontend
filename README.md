# 🍔 GoFood - Food Delivery Application (Frontend)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Render](https://img.shields.io/badge/Deployed_on-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

GoFood is a dynamic, full-stack food delivery web application. This repository contains the **React.js frontend**, which provides a seamless, responsive user interface for browsing menus, managing a shopping cart, and handling user authentication.

**[🚀 View Live Demo Here](https://gofood-backend-1-jdc6.onrender.com)** *(Note: The backend is hosted on a free tier and may take 50 seconds to wake up on initial load).*

---

## ✨ Key Features

* **Dynamic Menu Rendering:** Fetches and displays real-time food items and categories directly from a MongoDB cloud database.
* **Global Shopping Cart:** Utilizes React Context API and `useReducer` for complex state management, allowing users to add items, adjust quantities, and calculate totals instantly without prop-drilling.
* **User Authentication:** Secure Sign Up and Login flows with JWT (JSON Web Tokens) and bcrypt password hashing (handled by the backend).
* **Responsive Design:** Fully mobile-friendly UI built with Bootstrap.

---

## 🛠️ Tech Stack

* **Core:** React.js (Functional Components, Hooks)
* **Routing:** React Router DOM
* **State Management:** React Context API
* **Styling:** CSS3, Bootstrap 5
* **API Communication:** Native JavaScript `fetch()` API

---

## 🚀 Local Installation & Setup

To run this React application on your local machine, follow these steps:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.
You will also need the **GoFood Backend** running locally or deployed in the cloud to fetch the food data.

### 2. Clone the Repository
```bash
git clone [https://github.com/YOUR-USERNAME/gofood-frontend.git](https://github.com/YOUR-USERNAME/gofood-frontend.git)
cd gofood-frontend
