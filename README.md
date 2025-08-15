# Airbnb (Node.js + Express)

A simple Airbnb-like backend API built with Node.js, Express, and MySQL.

## Features

- User registration, login, and profile management
- Property listing and booking
- Category management with image upload
- RESTful API endpoints
- Image storage and retrieval

## Project Structure

```
.
├── Airbnb.postman_collection.json   # Postman API collection
├── config.js                       # JWT secret config
├── db.js                           # MySQL database connection
├── package.json                    # Project dependencies
├── server.js                       # Main Express server
├── utils.js                        # Utility functions
├── images/                         # Uploaded images
├── resources/                      # Sample images
└── routes/
    ├── booking.js                  # Booking routes
    ├── category.js                 # Category routes
    ├── property.js                 # Property routes
    └── user.js                     # User routes
```

## Setup

1. **Install dependencies**
   ```sh
   npm install
   ```

2. **Configure MySQL**
   - Update your database credentials in [`db.js`](db.js).

3. **Run the server**
   ```sh
   node server.js
   ```
   
## API Usage

- Import [`Airbnb.postman_collection.json`](Airbnb.postman_collection.json) into Postman for ready-to-use API requests.
- Endpoints include `/users/registration`, `/user/login`, `/property`, `/booking`, `/category`, etc.

## Image Handling

- Uploaded images are stored in the [`images/`](images/) folder.
- Sample images are available in [`resources/`](resources/).

## Dependencies

See [`package.json`](package.json) for all dependencies:
- express
- mysql2
- multer
- jsonwebtoken
- cors
- crypto-js
- nodemon (dev)

**Note:** Make sure your MySQL server is running and accessible. Adjust environment variables and credentials as needed.
