// import the required packages
const mysql = require ('mysql2');
const CLI = require('./lib/cli');

// create the port to run the application
const PORT = process.env.PORT || 3001;

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
  });

  // check if a successful connection was established to the database
  db.connect((error) => {
    // if error in connection, gives the user back the error
    if (error) {
      console.error('Error connecting to the database: ', error);
      return;
    } else {
    // if connection was successful, run the command line interface for user input
    console.log(`Now connected to the employee database through PORT ${PORT}!`);
    new CLI().run();
    }
  });
