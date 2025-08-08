# WearWave_Ecommerce

A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js). Includes both user-facing and admin functionality.

##  Features

### User
- User registration, login, and profile management
- Browse, search, and filter products
- Shopping cart functionality
- Order processing and order history viewing

### Admin
- Secure admin dashboard
- Create, update, and delete products
- Manage categories, orders, and users

##  Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT
- **Frontend**: React.js (possibly with Redux, Tailwind/Material UI)
- **Authentication**: JWT tokens with secure routing
- **Dev Tools**: Vite or Create React App

##  Getting Started

### Prerequisites
- Node.js ≥ v16.x
- MongoDB (local or Atlas cluster)

### Clone the repo and install dependencies
```bash
git clone https://github.com/whatevaman1/WearWave_Ecommerce.git
cd WearWave_Ecommerce
npm install               # root level if there’s a monorepo structure
cd backend && npm install # for server
cd ../frontend && npm install # for client
