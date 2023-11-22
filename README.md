# HeyDaw Assignment

---

### **Server.js**
- **Purpose**: Configuration and setup for the server.

### **Code Overview**
- Imports necessary modules for the server setup.
- Configures middleware and routes.
- Connects to MongoDB using Mongoose.
- Defines API routes and serves static files for an SPA.
- Starts the server.

### **Libraries and Dependencies**
- `dotenv`: Loads environment variables from a `.env` file.
- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `cors`: Enables Cross-Origin Resource Sharing.
- `sanatize`: Custom middleware for sanitizing user inputs.

---

### **PaymentRoute.js**
- **Purpose**: Defines API routes related to payment and subscription functionality.

### **Routes**
1. `/api/payment/checkout`:
   - Handles subscription checkout process using Stripe.
   - Retrieves plan details, applies coupon discounts, and creates a Stripe checkout session.
   
2. `/api/payment/success`:
   - Processes successful subscription payments.
   - Stores subscription details in the database.

3. `/api/payment/coupons`:
   - Retrieves a list of available coupons.

4. `/api/payment/prices`:
   - Retrieves a list of active subscription prices.

### **Libraries and Dependencies**
- `stripe`: Official Stripe API library for Node.js.
- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `body-parser`: Middleware for parsing request bodies.
- `dotenv`: Loads environment variables from a `.env` file.

---

### **UserRoute.js**
- **Purpose**: Defines API routes related to user authentication.

### **Routes**
1. `/api/user/signup`:
   - Handles user signup by creating new user accounts.
   - Performs password hashing before storing in the database.

2. `/api/user/login`:
   - Handles user login authentication.

### **Libraries and Dependencies**
- `express`: Web framework for Node.js.
- `bcrypt`: Library for password hashing.
- `body-parser`: Middleware for parsing request bodies.

---

### **Models**
- `User`, `Coupon`, `Subscription`: MongoDB models using Mongoose for users, coupons, and subscriptions.
- Defines schemas and structures for database collections.

### **Sanitize.js**
- **Purpose**: Custom middleware for sanitizing user inputs.
- Sanitizes request parameters, query strings, and request bodies using the `validator` library to prevent XSS attacks.

---
