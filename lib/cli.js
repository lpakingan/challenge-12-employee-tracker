// import the inquirer package
const inquirer = require('inquirer');

// main class for user command line interface
class CLI {
    // the function run takes in the database connection
    async run(db) {
        // exitDatabase being false allows for the user to keep picking choices until they select 'Exit Database'
        let exitDatabase = false;

        while(!exitDatabase) {
        // list of choices for the user
            const userchoice = await inquirer.prompt([
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
            switch (userchoice.userchoice) {
          
                case 'View All Departments':
                    await viewDepartments(db);
                    break;

                case 'View All Roles':
                    await viewRoles(db);
                    break;

                case 'View All Employees':
                    await viewEmployees(db);
                    break;

                case 'Exit Database':
                    exitDatabase = true;
                    console.log('Exiting Database... Bye!');
                    break;
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
                    console.error('Unable to retrieve departments: ', error);
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
                    console.error('Unable to retrieve roles: ', error);
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
                    console.error('Unable to retrieve employees: ', error);
                    reject(error);
                } else {
                    console.table (result);
                    resolve(result);
                    console.log('Returning to database options...');
                }
            });
        });
    }

// exports the CLI class to the main server file
module.exports = CLI;