const questions = {
    mainmenu: [
        {
        type: 'list',
        name: 'type',
        message: 'What would you like to do?',
        choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee',
            'View Employee by Deparment', 'View Employee by Manager','View Department Budget', 'Update Employee Manager', 'Delete Department', 'Delete Role', 'Delete Employee']
        }
    ],
    addDepartment: [
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter New Department Name:'
        }
    ],
    addRole: [
        {
            type: 'input',
            name: 'roleName',
            message: 'Enter New Role Name:'
        },
        {
            type: 'input',
            name: 'salery',
            message: 'Enter the Salery for this Role:'
        }
    ],
    addEmployee: [
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?"
        },
    ]
}

module.export = questions