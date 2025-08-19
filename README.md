# Rentify

Rentify is a full-stack MERN (MongoDB, Express.js, React, Node.js) application designed to streamline property rental management. It provides a platform for users to browse listings, contact property owners, and for administrators to manage users, listings, and gain insights into platform activity.

## Features

### User Features
- User authentication (registration, login, logout)
- Browse property listings
- View detailed property information
- Contact property owners
- User profiles

### Admin Features
- **Admin Dashboard Overview**: View dynamic statistics such as total users, total listings, and total contact messages. Includes interactive charts (bar and pie charts) for data visualization.
- User Management: Add, edit, and delete user accounts.
- Listings Management: Create, update, and remove property listings.
- Contact Message Management: View and manage contact messages submitted by users.

## Technologies Used

### Frontend (React)
- React.js
- React Router DOM
- Axios for API requests
- Chart.js and React-Chartjs-2 for data visualization
- CSS for styling

### Backend (Node.js with Express.js)
- Node.js
- Express.js
- MongoDB (with Mongoose for ODM)
- JSON Web Tokens (JWT) for authentication
- bcrypt.js for password hashing
- express-async-handler for simplified async error handling
- dotenv for environment variables

## Setup and Installation

To get Rentify up and running on your local machine, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Rentify.git
cd Rentify
```

### 2. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the `backend` directory and add your MongoDB URI and JWT Secret:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm start
```

The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup (User Application)

Navigate to the `frontend` directory:

```bash
cd ../frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend application will run on `http://localhost:5173` (or another available port).

### 4. Frontend Setup (Admin Panel)

Navigate to the `admin` directory:

```bash
cd ../admin
```

Install dependencies:

```bash
npm install
```

Start the admin panel development server:

```bash
npm run dev
```

The admin panel will run on `http://localhost:5174` (or another available port).

## Usage

- **User Application**: Access the main application at `http://localhost:5173` (or your frontend port). Register, log in, browse listings, and contact owners.
- **Admin Panel**: Access the admin login page at `http://localhost:5174/admin/login` (or your admin frontend port). Log in with an admin account to manage users, listings, and view dashboard statistics.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

[Specify your license here, e.g., MIT License]