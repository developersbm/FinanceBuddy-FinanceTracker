<div id="readme-top"></div>

# FinanceBuddy (MERN)

## Documentation 
- <a href="#Authentication">Authentication & Users (Coming Soon)</a>
- <a href="#Showcase">Showcase</a>
- <a href="#built-with">Built With</a>
- <a href="#backend">Backend</a>
- <a href="#connecting-backend--frontend">Connecting Frontend & Backend</a>
- <a href="#to-do">To Do</a>

<a id="Showcase"></a>

## Showcase (Main Website)

https://github.com/developersbm/FinanceBuddy-FinanceTracker/assets/122469079/24cdcbdd-f8df-45a4-a69c-d53fd185007a

## Showcase (Stock Predictor)

https://github.com/developersbm/FinanceBuddy-FinanceTracker/assets/122469079/00e5bde6-435e-48a9-a291-1f3fe0a51282

<a id="built-with"></a>

# Built With
* [![React][React.com]][React-url] 
* [![MongoDB](https://img.shields.io/badge/MongoDB-darkgreen?logo=mongodb&logoColor=white&style=flat-square)](https://docs.mongodb.com/)
* [![Node.js](https://img.shields.io/badge/Node.js-green?logo=node.js&logoColor=white&style=flat-square)](https://nodejs.org/)
* [![Express.js](https://img.shields.io/badge/Express.js-blue?logo=express&logoColor=white&style=flat-square)](https://expressjs.com/)
* ![Python][Python.com]
* [![HTML][HTML.com]][HTML-url]
* [![CSS][CSS.com]][CSS-url]



<div id="backend"></div>

## Backend (API, MongoDB & CRUD)

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

* Allow access to the backend
```
cd backend
npm start
```
* Allow access to the frontend
```
cd frontend
npm start
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<div id="connecting-backend--frontend"></div>

## Connecting Backend & Frontend
- For this I use the globalContext.js Here I track different functions with the base URL of my backend route.
- I use the library of axios to POST, GET, DELETE elements.


#### addIncome/Expenses
- Sends an HTTP POST request to the specified URL ${BASE_URL}add-income, including the income data.
- Sets up an error handling mechanism using .catch() to handle any errors that occur during the request, updating the error state with the error message from the response if an error occurs.
- Calls the getIncomes() function after the request completes successfully, to fetch and update the list of incomes to reflect the newly added income.
#### getIncome/Expenses
- Sends an HTTP GET request to the specified URL ${BASE_URL} get-incomes, including the income data.
#### deleteIncome/Expenses
- Sends an HTTP DELETE request to the specified URL ${BASE_URL} delete-income and grabs the id that needs to be deleted.
- Calls the getIncomes() function after the request completes successfully, to fetch and update the list of incomes to reflect the newly deleted income.
#### totalIncome/Expenses
- It iterates over each income entry in the incomes/expenses array using the forEach() method.
- For each income/expense entry, it adds the amount to the totalIncome variable.
- After iterating through all income entries, it returns the calculated totalIncome/totalExpenses, representing the sum of all income amounts in the array.
#### totalBalance
- For this function I only return the totalIncome() - totalExpenses()

#### transactionHistory
- Generates a summary of the transaction history by combining income and expense records.
- Sorting them based on their creation dates in descending order. This is executed by the comparator function that compares 2 transactions a & b by their creation dates.
- Using splice to return the three most recent transactions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
<div id="to-do"></div>

## To Do
- User Authentication so that each user has their own FinanceBuddy
- Stock Predictor model (Already created in Python but has to be translated into React.js)
- Chat with AI so that it can help you track your income and expenses more effectively

<p align="right">(<a href="#readme-top">back to top</a>)</p

[Python.com]:https://img.shields.io/badge/Python-blue?logo=python&logoColor=white&style=flat-square
[Python-url]: https://www.python.org/
[HTML.com]: https://img.shields.io/badge/HTML-orange?logo=html5&style=flat-square
[HTML-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS.com]: https://img.shields.io/badge/CSS-blue?logo=css3&style=flat-square
[CSS-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[React.com]: https://img.shields.io/badge/React-blue?logo=react&logoColor=white&style=flat-square
[React-url]: https://legacy.reactjs.org/docs/getting-started.html
