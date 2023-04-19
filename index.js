const inquirer = require("inquirer")
const mysql = require("mysql2");
const questions = require("./questions")
const cTable = require('console.table');
require('dotenv').config()

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '123123',
      database: 'employee_db'
    },
);

const mainMenu = () => {
    const mainmenu = [
      {
        type: 'list',
        name: 'type',
        message: 'What would you like to do?',
        choices: [
          'View Departments',
          'View Roles',
          'View Employees',
          'Add Department',
          'Add Role',
          'Add Employee',
          'Update Employee',
          'View Employee by Deparment',
          'View Employee by Manager',
          'View Department Budget',
          'Update Employee Manager',
          'Delete Department',
          'Delete Role',
          'Delete Employee',
          'Exit',
        ],
      },
    ];
    console.log('Welcome to the [Insert Company Name] Employee Tracker');
    inquirer.prompt(mainmenu).then((data) => pickOption(data));
  };
  
  
  const pickOption = ({ type }) => {
    switch (type) {
      case "View Departments": viewDepartments(); break;
      case "View Roles": viewRoles(); break;
      case "View Employees": viewEmployees(); break;
      case "Add Department": addDepartment(questions); break;
      case "Add Role": addRole(questions); break;
      case "Add Employee": addEmployee(questions); break;
      case "Update Employee": updateEmployee(); break;
      case "View Employee by Manager": viewEmployeesByManager(); break;
      case "View Employee by Deparment": viewEmployeesByDepartment(); break;
      case "View Department Budget": viewDepartmentBudget(); break;
      case "Update Employee Manager": updateEmployeeManager(); break;
      case "Delete Department": deleteDepartment(); break;
      case "Delete Role": deleteRole(); break;
      case "Delete Employee": deleteEmployee(); break;
      case "Exit": process.exit(console.log('Bye!')); break;
      default: break;
    }
  };
  
  mainMenu(questions);


function viewDepartments(){
    const view = `SELECT * FROM department`
    db.query(view, (err, results)=>{
        if (err) {
            console.log(err);
            }
            console.table('',results)
            mainMenu(questions)
    })
}

function viewRoles(){
    const view = `SELECT title, role.id, department.name AS department, salary FROM role JOIN department ON role.department_id = department.id`
    db.query(view, (err, results)=>{
        if (err) {
            console.log(err);
            }
            console.table('',results)
            mainMenu(questions)
    })
}

function viewEmployees(){
    const view = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, manager.first_name AS manager FROM employee LEFT JOIN employee AS manager ON employee.manager_id = manager.id INNER JOIN role ON role.id = employee.role_id INNER JOIN department ON role.department_id = department.id ORDER BY employee.id`
    db.query(view, (err, results)=>{
        if (err) {
            console.log(err);
            }
            console.table('',results)
            mainMenu(questions)
    })
}

function addDepartment() {
    const departmentadd = [
        {
            type: "input",
            name: "departmentName",
            message: "Enter the department name:"
        }
    ];

    inquirer.prompt(departmentadd)
    .then(data => {
        const {departmentName} = data
        const add = `INSERT INTO department (name) VALUES (?)`
        db.query(add, departmentName, (err, results) => {
            if (err) {
                console.log(err);
            }
            console.log(results)
            mainMenu(questions)
        })
    })
}


function addRole() {
    const roleadd = [
        {
            type: "input",
            name: "roleName",
            message: "Enter the role name:"
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary:"
        }
    ];

    db.query(`SELECT * FROM department`, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        inquirer.prompt(roleadd)
        .then(data => {
            const {roleName, salary} = data
            const names = res.map(re => re.name)
            inquirer.prompt([      
                {
                    type: "list",
                    name: "department",
                    message: "What Department do they belong to?",
                    choices: names
                }
            ])
            .then(data => {
                const add = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
                db.query(add, [roleName, salary, names.indexOf(data.department) + 1], (error, results) => {
                    if (error) console.log(error)
                    console.log(results)
                    mainMenu(questions)
                })
            })
        })
    })
}


function addEmployee() {
    const employeeadd = [
        {
            type: "input",
            name: "firstName",
            message: "Enter the employee's first name:"
        },
        {
            type: "input",
            name: "lastName",
            message: "Enter the employee's last name:"
        }
    ];

    db.query(`SELECT * FROM employee`, (err, emp) => {
        db.query(`SELECT * FROM role`, (err2, role) => {
            inquirer.prompt(employeeadd)
            .then(data => {
                const {firstName, lastName} = data
                const roles = role.map(role => role.title)
                inquirer.prompt([
                    {
                        type: "list",
                        name: "role",
                        message: "Which role do they have?",
                        choices: roles
                    }
                ])
                .then(data2 => {
                    const {role} = data2
                    let managers = emp.map(emp => emp.first_name)
                    managers = [...managers, "No Manager"]
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "manager",
                            message: "Who is their manager?",
                            choices: managers
                        }
                    ])
                    .then(data3 => {
                        let {manager} = data3
                        let managerId;
                        if (manager === "No Manager"){
                            managerId = null
                        } else managerId = managers.indexOf(manager) + 1
                        
                        const add = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
                        db.query(add, [firstName, lastName, roles.indexOf(role) + 1, managerId], (err3, results) => {
                            if (err3) console.log(err3)
                            console.log(results)
                            mainMenu(questions)
                        })
                    })
                })
            })
        })
    })
}


function updateEmployee() {
    db.query(`SELECT * FROM employee`, (err, emp) => {
        db.query(`SELECT * FROM role`, (err, role) => {
            const employees = emp.map(emp => emp.first_name)
            const roles = [...role.map(role => role.title), "nevermind"]
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: "Which employee would you like to change roles and salary for?",
                    choices: employees
                },
                {
                    type: "list",
                    name: "role",
                    message: "Which role would you like the employee to be reassigned to?",
                    choices: roles
                }
            ])
            .then(data => {
                const { employee, role, salary } = data
                if (role === "nevermind") {
                    mainMenu(questions);
                    return;
                }
                const updateRole = `UPDATE employee SET role_id = ? WHERE employee.id = ?`;
                const roleId = roles.indexOf(role) + 1;
                const employeeId = employees.indexOf(employee) + 1;

                db.query(updateRole, [roleId, employeeId], (err, result) => {
                    if (err) console.log(err);
                    console.log(result);
                    mainMenu(questions);
                });
            })
        })
    })
}


function viewEmployeesByManager(){
    db.query(`SELECT * FROM employee`, (err, emp) => {
        const employees = emp.map(emp=>emp.first_name)
        const employeeIds = emp.map(emp=>emp.id)
        const managerIds = emp.map(emp=>emp.manager_id)
        const managers = []
            managerIds.forEach(id=>{
            if (id == null) return
            if (!managers.includes(employees[id-1]))managers.push(employees[id-1])
        })
        const managerIdTracker = []
            managers.forEach(manager=>{
                employees.forEach((employee, i)=>{
                    if (manager == employee) managerIdTracker.push(i)
                })
            })

        inquirer.prompt({
            type: "list",
            name: "manager",
            message: "Which manager's employees would you like to view?",
            choices: managers
        })
        .then(data => {
            const {manager} = data
            const query = `SELECT first_name, last_name, role.title FROM employee JOIN role ON role.id = employee.role_id WHERE manager_id = ?`
            db.query(query, employeeIds[employees.indexOf(manager)], (err, results) =>{
                if (err) console.log(err)
                console.table('',results)
                mainMenu(questions)
            })
        })
    })
}

function viewEmployeesByDepartment(){
    db.query(`SELECT * FROM department`, (err, dep) => {
        const departments = dep.map(dep=>dep.name)
        inquirer.prompt([{
            type: "list",
            name: "department",
            message: "Which department would you like to view?",
            choices: departments
        }])
        .then(data => {
            const {department} = data
            const departmentID = departments.indexOf(department)+1
            const sql = `SELECT first_name, last_name AS last_name FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department ON role.department_id = department.id  WHERE employee.role_id = role.id AND role.department_id = ?`
            db.query(sql, departmentID, (err, results) => {
                if (err) console.log(err)
                console.table('',results)
                mainMenu(questions)
            })
        })
    })
}

function updateEmployeeManager(){
    db.query(`SELECT * FROM employee`, (err, emp) => {
        const employees = emp.map(emp=>emp.first_name)
        inquirer.prompt({
            type: "list",
            name: "employee",
            message: "Which employee's manager would you like to update?",
            choices: employees
        })
        .then(data => {
            const {employee} = data
            const potentialManagers = employees.filter(emp=>emp != employee)
            inquirer.prompt({
                type: "list",
                name: "manager",
                message: "Who is their new manager?",
                choices: potentialManagers
            })
            .then(data => {
                const {manager} = data
                const managerId = employees.indexOf(manager)+1
                const sql = `UPDATE employee SET manager_id = ? WHERE employee.first_name = ?`
                db.query(sql, [managerId, employee], (err, results) => {
                    if (err) console.log(err)
                    console.log(results)
                    mainMenu(questions)
                })
            })
        })
    })
}

function deleteDepartment(){
    db.query(`SELECT * FROM department`, (err, dep) => {
        const departments = [...dep.map(dep=>dep.name), "BACK"]
        inquirer.prompt({
            type:"list",
            name: "department",
            message: "Which department would you like to delete? (Warning, this will delete all roles and employees that belong to this department.)",
            choices: departments
        })
        .then(data=>{
            const remove = `DELETE FROM department WHERE id = ?`
            const {department} = data
            if (department == "BACK") return mainMenu(questions)
            const departmentId = departments.indexOf(department)+1
            db.query(remove, departmentId, (err, results) => {
                if (err) console.log(err)
                console.log(results)
                mainMenu(questions)
            })
        })
    })
}

function deleteRole(){
    db.query(`SELECT * FROM role`, (err, rol) => {
        const roles = [...rol.map(rol=>rol.title), "BACK"]
        inquirer.prompt({
            type:"list",
            name: "role",
            message: "Which role would you like to delete? (Warning, this will delete all employees that possess that role.)",
            choices: roles
        })
        .then(data=>{
            const remove = `DELETE FROM role WHERE id = ?`
            const {role} = data
            if (role == "BACK") return mainMenu(questions)
            const roleId = roles.indexOf(role)+1
            db.query(remove, roleId, (err, results) => {
                if (err) console.log(err)
                console.log(results)
                mainMenu(questions)
            })
        })
    })
}

function deleteEmployee(){
    db.query(`SELECT * FROM employee`, (err, emp) => {
        const employees = [
            ...emp.map((employee) => `${employee.first_name} ${employee.last_name}`),
            "BACK",
          ];
        inquirer.prompt({
            type:"list",
            name: "employee",
            message: "Which employee would you like to delete?",
            choices: employees
        })
        .then(data=>{
            const remove = `DELETE FROM employee WHERE id = ?`
            const {employee} = data
            if (employee == "BACK") return mainMenu(questions)
            const employeeId = employees.indexOf(employee)+1
            db.query(remove, employeeId, (err, results) => {
                if (err) console.log(err)
                console.log(results)
                mainMenu(questions)
            })
        })
    })
}

function viewDepartmentBudget(){
    db.query(`SELECT * FROM department`, (err, dep) => {
        const departments = dep.map(dep=>dep.name)
        inquirer.prompt({
            type: "list",
            name: "department",
            message: "Which department's budget would you like to view?",
            choices: departments
        })
        .then(data => {
            const {department} = data
            const sql = `SELECT SUM(role.salary) AS  "${department} budget" FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department ON role.department_id = department.id WHERE department.name = ? `
            db.query(sql, department, (err, results) => {
                if (err) console.log(err)
                console.table('',results)
                mainMenu(questions)
            })
        })
    })
}