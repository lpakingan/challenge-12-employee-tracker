const inquirer = require('inquirer');

class CLI {
    run() {
        return inquirer
            .prompt([
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
            ])
            .then(({ userchoice }) => {
                switch (userchoice) {
                    case 'View All Departments':
                    const sql = 'SELECT id, department_name FROM department';
                    db.query(sql, (error, result) => {
                        if (error) {
                            console.error('Unable to retrieve departments: ', error);
                            return;
                        } else {
                            console.log (result);
                        }
                    })
                }
            })
        }
}
module.exports = CLI;