const inquirer = require('inquirer');

class CLI {
    async run() {
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

            switch (userchoice) {
                    
                case 'View All Departments':
                    const departmentSQL = 'SELECT id, department_name FROM department';
                    await db.query(departmentSQL, (error, result) => {
                        if (error) {
                            console.error('Unable to retrieve departments: ', error);
                            return;
                        } else {
                            console.log (result);
                        }});
                        break;

                case 'View All Roles':
                    const roleSQL = 'SELECT id, title, department_id, salary FROM role';
                    await db.query(roleSQL, (error, result) => {
                        if (error) {
                            console.error('Unable to retrieve roles: ', error);
                            return;
                        } else {
                             console.log (result);
                        }});
                        break;

                case 'View All Employees':
                    const employeeSQL = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';
                    await db.query(employeeSQL, (error, result) => {
                        if (error) {
                            console.error('Unable to retrieve employees: ', error);
                            return;
                        } else {
                            console.log (result);
                        }});
                        break;
                }
            }
        }

module.exports = CLI;