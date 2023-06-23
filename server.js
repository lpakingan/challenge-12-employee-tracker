// import the required packages
const express = require('express');
const mysql = require ('mysql12');
const CLI = require('./lib/cli');

// create the port to run the application and run express
const PORT = process.env.PORT || 3001;
const app = express();

// express the middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connect to the employee database
const db = mysql.createConnection(
  {
    // MySQL host
    host: 'localhost',
    // MySQL username 
    user: 'root',
    // MySQL password
    password: '123',
    // the employee database that is being called
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// run the command line interface for user input
new CLI().run();