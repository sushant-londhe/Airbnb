# Airbnb

This project is a full-stack Airbnb clone with a React.js frontend and a Node.js/Express backend.

## Project Structure

```
Airbnb/
  ├── README.md
  ├── Airbnb/                # Frontend (React.js)
  │   ├── src/               # React source code
  │   ├── public/
  │   ├── routes/
  │   ├── utils.js
  │   ├── config.js
  │   ├── db.js
  │   ├── server.js          # Express backend (legacy, see below)
  │   ├── package.json
  │   └── ...other files
  ├── server/                # Backend (Node.js/Express)
  │   ├── db.sql
  │   ├── mailer.js
  │   ├── server.js
  │   ├── db/
  │   ├── images/
  │   ├── routes/
  │   ├── utils/
  │   ├── package.json
  │   └── ...other files
```

## Prerequisites

- Node.js (v18+ recommended)
- npm

## Setup Instructions

### 1. Backend (server/)

1. Install dependencies:
   ```sh
   cd server
   npm install
   ```

2. Configure your database in `db.sql` and update connection settings in `db/`.

3. Start the backend server:
   ```sh
   npm start
   ```
   The backend runs on [http://localhost:4000](http://localhost:4000).

### 2. Frontend (Airbnb/Airbnb/)

1. Install dependencies:
   ```sh
   cd Airbnb/Airbnb
   npm install
   ```

2. Start the frontend development server:
   ```sh
   npm run dev
   ```
   The frontend runs on [http://localhost:5173](http://localhost:5173) (default Vite port).

3. Update `config.js` if needed to point to your backend server URL.

## Features

- User authentication (register, login)
- Property listing, details, and booking
- Wishlist management
- Profile management
- Responsive UI with React and Bootstrap
- RESTful API backend with Express

## Folder Details

- **Airbnb/Airbnb/src/**: React components, pages, services, and context.
- **Airbnb/Airbnb/routes/**: Express route handlers (legacy, see server/ for main backend).
- **server/routes/**: Main backend API routes (user, property, booking, etc.).
- **server/db/**: Database connection and queries.
- **server/images/**: Static images served by backend.

## Useful Scripts

- **Frontend**
  - `npm run dev` – Start development server
  - `npm run build` – Build for production
  - `npm run lint` – Lint code

- **Backend**
  - `npm start` – Start backend server

## Notes

- Ensure both frontend and backend servers are running for full functionality.
- API endpoints are documented in `Airbnb.postman_collection.json`.

