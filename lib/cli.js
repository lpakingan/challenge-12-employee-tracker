const inquirer = require('inquirer');

class CLI {
    async run(db) {
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
                        'Update an Existing Employee'
                    ]
                }
            ]);

            switch (userchoice.userchoice) {
          
                case 'View All Departments':
                    async function viewDepartments(db) {
                        const departmentSQL = 'SELECT id, department_name FROM department';
                        db.query(departmentSQL, (error, result) => {
                            if (error) {
                                console.error('Unable to retrieve departments: ', error);
                                return;
                            } else {
                                console.table (result);
                            }
                        });
                    }
                    viewDepartments(db);
                    break;

                case 'View All Roles':
                    async function viewRoles(db) {
                        const roleSQL = 'SELECT id, title, department_id, salary FROM role';
                        db.query(roleSQL, (error, result) => {
                            if (error) {
                                console.error('Unable to retrieve roles: ', error);
                                return;
                            } else {
                                console.table (result);
                            }
                        });
                    }
                    viewRoles(db);
                    break;

                case 'View All Employees':
                    async function viewEmployees(db) {
                        const employeeSQL = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';
                        db.query(employeeSQL, (error, result) => {
                            if (error) {
                                console.error('Unable to retrieve employees: ', error);
                                return;
                            } else {
                                console.table (result);
                            }
                        });
                    }
                    viewEmployees(db);
                    break;
                }
            }
        }

module.exports = CLI;