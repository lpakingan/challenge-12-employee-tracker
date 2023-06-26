// import the inquirer package
const inquirer = require('inquirer');

// main class for user command line interface
class CLI {
    // the function run takes in the database connection
    async run(db) {
        // exitDatabase being false allows for the user to keep picking choices until they select 'Exit Database'
        let exitDatabase = false;

        console.log('WELCOME TO THE EMPLOYEE TRACKER');

        while(!exitDatabase) {
        // list of choices for the user
            const choice = await inquirer.prompt([
                    {
                        type: 'list',
                        name: 'userchoice',
                        message: 'What would you like to do?',
                        choices: [
                            'View All Departments',
                            'View All Roles',
                            'View All Employees',
                            'Add a New Department',
                            'Add a New Role',
                            'Add a New Employee',
                            'Update an Existing Employee',
                            'Exit Database'
                        ]
                    }
                ]);
            
            // switch case that takes the user choice and will run the respective function to show the user results of their choice
            switch (choice.userchoice) {
          
                case 'View All Departments':
                    await viewDepartments(db);
                    break;

                case 'View All Roles':
                    await viewRoles(db);
                    break;

                case 'View All Employees':
                    await viewEmployees(db);
                    break;
                
                case 'Add a New Department':
                    await addDepartment(db);
                    break;
                
                case 'Add a New Role':
                    await addRole(db);
                    break;
                
                case 'Add a New Employee':
                    await addEmployee(db);
                    break;
                
                case 'Update an Existing Employee':
                    await updateEmployee(db);
                    break;

                case 'Exit Database':
                    exitDatabase = true;
                    console.log('Exiting Database... Bye!');
                    process.exit()
                }
            }
        }
    }

    // console logs a table of the departments
    async function viewDepartments(db) {
        return new Promise((resolve, reject) => {
            const departmentSQL = 'SELECT id, department_name FROM department';
            db.query(departmentSQL, (error, result) => {
                if (error) {
                    console.error('Unable to retrieve departments: ');
                    reject(error);
                } else {
                    console.table (result);
                    resolve(result);
                    console.log('Returning to database options...');
                }
            });
        });
    }

    // console logs a table of the roles
    async function viewRoles(db) {
        return new Promise((resolve, reject) => {
            const roleSQL = 'SELECT id, title, department_id, salary FROM role';
            db.query(roleSQL, (error, result) => {
                if (error) {
                    console.error('Unable to retrieve roles: ');
                    reject(error);
                } else {
                    console.table (result);
                    resolve(result);
                    console.log('Returning to database options...');
                }
            });
        });
    }

    // console logs a table of the employees
    async function viewEmployees(db) {
        const employeeSQL = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';
        return new Promise((resolve, reject) => {
            db.query(employeeSQL, (error, result) => {
                if (error) {
                    console.error('Unable to retrieve employees: ');
                    reject(error);
                } else {
                    console.table (result);
                    resolve(result);
                    console.log('Returning to database options...');
                }
            });
        });
    }

    // add a new department
    async function addDepartment(db) {
        const choice = await inquirer.prompt([
            {
                type: 'input',
                name: 'departmentInput',
                message: 'What is the name of the department to be added?',
                validate: checkInput
            }
        ]);

        const departmentSQL = 'INSERT INTO department (department_name) VALUES (?)';
        return new Promise((resolve, reject) => {
            db.query(departmentSQL, [choice.departmentInput], (error, result) => {
                if (error) {
                    console.error('Unable to add department: ');
                    reject(error);
                } else {
                    resolve(result);
                    console.log('Department successfully added!');
                    console.log('Returning to database options...');
                }
            });
        });
    }

    // add a new role
    async function addRole(db) {
        // obtain a list of the departments to use as a list for the user to choose from
        const departmentsList = await departmentList(db);

        // asks user to input own role name/salary, departmentsList as a choice list
        const choice = await inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'What is the name of the role to be added?',
                validate: checkInput
            },
            {
                type: 'input',
                name: 'roleSalary',
                message: 'What is the salary of the role?',
                validate: checkInt
            },
            {
                type: 'list',
                name: 'roleDepartment',
                message: 'What department is the role in?',
                choices: departmentsList.map(department => ({
                    name: department.department_name,
                    value: department.id
                }))
            },
        ]);

        const roleSQL = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(roleSQL, [choice.roleName, choice.roleSalary, choice.roleDepartment], (error, result) => {
                if (error) {
                    console.error('Unable to add role: ');
                    reject(error);
                } else {
                    resolve(result);
                    console.log('Role successfully added!');
                    console.log('Returning to database options...');
                }
            });
        });
    }

     // add a new employee
     async function addEmployee(db) {
        // obtain lists of roles and employees
        const rolesList = await roleList(db);
        const employeesList = await employeeList(db);

        // map employees and add a new value for a no manager option
        const employees = employeesList.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }))

        employees.push({ name: 'No manager', value: null })

        // asks user to input employee first/last names, choose role/manager from provided list
        const choice = await inquirer.prompt([
            {
                type: 'input',
                name: 'employeeFN',
                message: 'What is the first name of the employee?',
                validate: checkInput
            },
            {
                type: 'input',
                name: 'employeeLN',
                message: 'What is the last name of the employee?',
                validate: checkInput
            },
            {
                type: 'list',
                name: 'employeeRole',
                message: 'What is the role of the employee?',
                choices: rolesList.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            },
            {
                type: 'list',
                name: 'employeeManager',
                message: 'Who is the manager of the employee?',
                choices: employees
            },
        ]);

        const employeeSQL = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            db.query(employeeSQL, [choice.employeeFN, choice.employeeLN, choice.employeeRole, choice.employeeManager], (error, result) => {
                if (error) {
                    console.error('Unable to add employee: ');
                    reject(error);
                } else {
                    resolve(result);
                    console.log('Employee successfully added!');
                    console.log('Returning to database options...');
                }
            });
        });
    }

    // updates an existing employee's role
    async function updateEmployee(db) {
        const rolesList = await roleList(db);
        const employeesList = await employeeList(db);

        const choice = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to edit?',
                choices: employeesList.map(employee => ({
                    name: `${employee.first_name} ${employee.last_name}`,
                    value: employee.id
                }))
            },
            {
                type: 'list',
                name: 'newRole',
                message: 'What is the new role of the employee?',
                choices: rolesList.map(role => ({
                    name: role.title,
                    value: role.id
                }))
            }
        ]);

        const employeeSQL = 'UPDATE employee SET role_id = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            db.query(employeeSQL, [choice.newRole, choice.employee], (error, result) => {
                if (error) {
                    console.error('Unable to update employee: ');
                    reject(error);
                } else {
                    resolve(result);
                    console.log('Employee successfully updated!');
                    console.log('Returning to database options...');
                }
            });
        });
    }

    // a validation function that ensures user does not enter empty input
    async function checkInput(input) {
        if (input.trim() == '') {
            console.log('----- You must enter valid non-empty input!');
            return;
        }
        return true;
    }

    // a validation function that ensures the user does not enter non-integer input
    async function checkInt(input) {
        if (isNaN(input.trim()) || input.trim() == '') {
            console.log('----- You must enter a valid number!');
            return;
        }
        return true;
    }

    // obtains an updated department list for addRole function
    async function departmentList(db) {
        return new Promise((resolve, reject) => {
            const departmentSQL = 'SELECT id, department_name FROM department';
            db.query(departmentSQL, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // obtains an updated role list for addEmployee function
    async function roleList(db) {
        return new Promise((resolve, reject) => {
            const roleSQL = 'SELECT id, title FROM role';
            db.query(roleSQL, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    // obtains an updated employee list for addEmployee function
    async function employeeList(db) {
        return new Promise((resolve, reject) => {
            const employeeSQL = 'SELECT id, first_name, last_name FROM employee';
            db.query(employeeSQL, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
                
// exports the CLI class to the main server file
module.exports = CLI;