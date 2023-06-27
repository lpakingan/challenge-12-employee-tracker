-- queries seen here are implemented into the main code of cli.js but are viewable here for better readibility 

-- query to join together department and role tables in order to create combined table for console log for viewRoles function
-- moved code to cli.js
SELECT 
    role.id AS ID, 
    role.title AS Title, 
    department.department_name AS Department, 
    role.salary AS Salary
FROM 
    department
JOIN
    role ON role.department_id = department.id;

-- query to join together department, role, and employee tables in order to create combined table for console log for viewEmployees function
-- moved code to cli.js
SELECT 
    employee.id AS ID, 
    employee.first_name AS FirstName, 
    employee.last_name AS LastName, 
    role.title AS Title, 
    department.department_name AS Department, 
    role.Salary AS Salary, 
    employee.manager_id AS Manager
FROM 
    department
JOIN
    role ON role.department_id = department.id
JOIN
    employee on employee.role_id = role.id;