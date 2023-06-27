# Bootcamp Challenge #12: Employee Tracker Using SQL

## Summary of the Challenge

In this week's challenge, we were tasked with creating a command-line application that manages a company's employee database. The specific packages/tools that were used included Node.js, Inquirer, and MySQL. 

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Installation
For this application, installation of Node.js, Inquirer, and MySQL are required. Inquirer and MySQL2 are packages that can be installed using npm in the terminal while in the directory of the application's files. For Inquirer, use ```npm i inquirer@8.2.4``` to install the correct version.

## Usage
To use the application, ensure that all packages/dependencies are installed by running ```npm install``` once in the directory of the application. Navigate to the db folder and login locally to MySQL to run schema.sql and seeds.sql by typing in ```source schema.sql``` and ```source seeds.sql```. After the database has been created and populated with the example data, run ```node server.js``` to open the server to access the employee database program. If the server does not open due to a login error, open server.js and change the MySQL username and password login credentials to your own. 

Once connected to the database, you will be able to scroll through a menu of options for what you would like to do. You are able to view, add/delete, or edit departments, roles, or employees that are stored within the database. See below for a demo on the functionality of the application.

## Resources Used
- W3Schools
- MDN Web Docs
- Stack Overflow
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Node.js Documentation](https://nodejs.org/en/docs)
- [Inquirer Documentation](https://www.npmjs.com/package/inquirer)


## Deployed Application
A video demoing how to use the application when opened in the command-line terminal can be watched at [this link](https://youtu.be/T6g1Ehs_MXE).
