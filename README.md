# BudgetBuddy <div id="#readme-top"></div>

## Documentation
- [Authentication & Users (Coming Soon)](#Authentication)
- [Frontend](#frontend)
- [Backend](#backend)
- [Connecting Frontend & Backend](#connecting-backend--frontend)

## Frontend <a name="frontend"></a>
Here goes frontend portion

## Backend (API, MongoDB & CRUD) <a name="backend"></a>

### Connecting Database to MongoDB
- Importing Mongoose library with an object (ODM), allowing to define schemas, models, and interact with Node.js.
- Connect your database to the MongoDB URL stored in the hidden .env file.
- Export the database so it can be used in other modules of the application.

### Income & Expenses (Express Route Handlers)

#### Adding Data to Database (HTTP POST)
- Parameters (request, response)
- Destructure title, amount, category, description from req.body
- Define IncomeSchema including all the requisites
- Implement Try & Catch for errors:
    - If title, category, description, date are missing: throw error
    - Ensure amount is a number
    - Await income.save() and handle success or error

#### Getting Fetching from Database (HTTP GET)
- Parameters (request, response)
- Implement Try & Catch for errors
- Fetch incomes using IncomeSchema.find().sort({createdAt: -1})
    - Pattern to fetch records in reverse chronological order, with the most recent ones first.

#### Delete (HTTP DELETE)
- Parameters (request, response)
- Extract id parameter
- Use Mongoose's findByIdAndDelete() based on the id
    - Handle successful operation with .then()
    - Catch and handle errors with .catch()

### Transactions
- Import functions responsible for handling HTTP requests related to expenses/income.
- Set up Express's Router.
    - const router = require('express').Router();
- Export the configured router for use in other parts of the app.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Starting the server

### Express Setup (Define the Port)
- Use the middleware for parsing JSON body and add cors to allow request in the frontend URL.
- Dynamic route mounting


# Connecting Backend & Frontend <a name="connecting-backend--frontend"></a>
Here goes the connection