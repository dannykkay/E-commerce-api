# E-Commerce API

A fully-featured RESTful e-commerce API built with Node.js, Express, and MongoDB. Supports user authentication, product management, reviews, and order processing with role-based access control.

🔗 **Live Demo: https://e-commerce-api-1-57v9.onrender.com

---

## Features

- **Authentication & Authorization** — JWT-based auth with HTTP-only cookies and role-based permissions (user / admin)
- **User Management** — Register, login, logout, update profile, and change password
- **Product Management** — Full CRUD for products with image upload support
- **Reviews** — Users can create, update, and delete their own reviews; products display aggregated ratings
- **Orders** — Create and manage orders with Stripe-ready payment intent integration
- **Security** — Rate limiting, helmet, XSS protection, MongoDB sanitization, and CORS support
- **API Docs** — Auto-generated HTML documentation served from `/api-docs`

---

## Tech Stack

- **Runtime:** Node.js 20.x
- **Framework:** Express 4
- **Database:** MongoDB + Mongoose 6
- **Auth:** JWT + bcryptjs + cookie-parser
- **Validation:** validator, Joi
- **File Upload:** express-fileupload
- **Security:** helmet, xss-clean, express-mongo-sanitize, express-rate-limit, cors
- **Dev Tools:** nodemon, morgan, jsdoc, Postman

---

## Project Structure

```
├── controllers/       # Route handler logic
├── db/                # Database connection
├── errors/            # Custom error classes
├── middleware/        # Auth, error handler, not-found middleware
├── mockData/          # Seed data
├── models/            # Mongoose schemas (User, Product, Review, Order)
├── public/            # Static files (API docs)
├── routes/            # Express routers
├── utils/             # JWT helpers, token utilities, checkPermissions
├── app.js             # Express app entry point
├── docs.json          # Postman collection export
└── Procfile           # Render/Heroku process config
```

---

## Getting Started

### Prerequisites

- Node.js >= 20.x
- MongoDB instance (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Installation

```bash
git clone https://github.com/dannykkay/E-commerce-api.git
cd E-commerce-api
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_LIFETIME=1d
```

### Running the Server

```bash
# Development (with hot reload)
npm start

# Production
node app.js
```

The server runs on `http://localhost:5000` by default.

---

## API Endpoints

### Auth — `/api/v1/auth`

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| POST | `/register` | Register a new user | Public |
| POST | `/login` | Login and receive cookie | Public |
| GET | `/logout` | Clear auth cookie | Public |

### Users — `/api/v1/users`

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/` | Get all users | Admin |
| GET | `/:id` | Get single user | Admin |
| GET | `/showMe` | Get current user | Authenticated |
| PATCH | `/updateUser` | Update name & email | Authenticated |
| PATCH | `/updateUserPassword` | Change password | Authenticated |

### Products — `/api/v1/products`

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/` | Get all products | Public |
| GET | `/:id` | Get single product | Public |
| GET | `/:id/reviews` | Get product reviews | Public |
| POST | `/` | Create product | Admin |
| PATCH | `/:id` | Update product | Admin |
| DELETE | `/:id` | Delete product | Admin |
| POST | `/uploadImage` | Upload product image | Admin |

### Reviews — `/api/v1/reviews`

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/` | Get all reviews | Public |
| GET | `/:id` | Get single review | Public |
| POST | `/` | Create a review | Authenticated |
| PATCH | `/:id` | Update own review | Authenticated |
| DELETE | `/:id` | Delete own review | Authenticated |

### Orders — `/api/v1/orders`

| Method | Route | Description | Access |
|--------|-------|-------------|--------|
| GET | `/` | Get all orders | Admin |
| GET | `/:id` | Get single order | Authenticated |
| GET | `/showAllMyOrders` | Get current user's orders | Authenticated |
| POST | `/` | Create an order | Authenticated |
| PATCH | `/:id` | Update order (mark paid) | Authenticated |

---

## Security

This API applies the following security measures:

- **helmet** — Sets secure HTTP headers
- **xss-clean** — Sanitizes user input against XSS attacks
- **express-mongo-sanitize** — Prevents MongoDB operator injection
- **express-rate-limit** — Limits repeated requests per IP
- **cors** — Configured with cookie credentials support
- Passwords hashed with **bcryptjs** before storage
- Auth tokens stored in **HTTP-only cookies**

---

## Deployment

The project includes a `Procfile` for easy deployment to Render or Heroku.

```
web: node app.js
```

Set all environment variables (`MONGO_URL`, `JWT_SECRET`, `JWT_LIFETIME`) in your hosting platform's dashboard before deploying.

---

## License

ISC
