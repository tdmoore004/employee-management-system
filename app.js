// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASS,
    database: "employee_management_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    start();
});

const addViewWhat = {
    name: "addViewWhat",
    type: "list",
    message: "What do you want to add or view?",
    choices: ["Department", "Role", "Employee"]
};

const start = () => {
    inquirer
        .prompt({
            name: "addOrUpdate",
            type: "list",
            message: "Would you like to ADD or VIEW departments, roles or employees or UPDATE employee roles?",
            choices: ["ADD", "VIEW", "UPDATE", "DONE"]
        }).then((response) => {
            if (response.addOrUpdate === "ADD") {
                inquirer
                    .prompt(addViewWhat).then((response) => {
                        if (response.addViewWhat === "Department") {
                            addDepartment();
                        } else if (response.addViewWhat === "Role") {
                            addRole();
                        } else if (response.addViewWhat === "Employee") {
                            addEmployee();
                        };
                    });
            } else if (response.addOrUpdate === "VIEW") {
                inquirer
                    .prompt(addViewWhat).then((response) => {
                        viewItem(response.addViewWhat.toLowerCase());
                    });
            } else if (response.addOrUpdate === "UPDATE") {
                inquirer
                    .prompt({
                        name: "updateWhat",
                        type: "input",
                        message: "Whose role do you want to update?",
                    }).then((response) => {
                        console.log(response.updateWhat);
                    });
            } else {
                connection.end();
            }
        });
};

const addDepartment = () => {
    inquirer
        .prompt({
            name: "departmentName",
            type: "input",
            message: "What is the name of the department you want to add?"
        }).then((response) => {
            connection.query("INSERT INTO department (name) VALUES (?)", [response.departmentName], (err, result) => {
                if (err) throw err;
            });
        });
};

const addRole = () => {
    inquirer
        .prompt([{
            name: "roleTitle",
            type: "input",
            message: "What is the title of the role you want to add?"
        },
        {
            name: "roleDepartment",
            type: "input",
            message: "What is the ID for the department this role is in?"
        }]).then((response) => {
            connection.query("INSERT INTO role (title, department_id) VALUES (?, ?)", [response.roleTitle, response.roleDepartment], (err, result) => {
                if (err) throw err;
            });
        });
};

const addEmployee = () => {
    inquirer
        .prompt([{
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee you are adding?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee you are adding?"
        },
        {
            name: "roleId",
            type: "input",
            message: "What is the ID for the role this employee will have?"
        },
        {
            name: "managerId",
            type: "input",
            message: "What is the ID for this employee's manager? (If there is no manager enter 0)"
        }
    ]).then((response) => {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.firstName, response.lastName, response.roleId, response.managerId], (err, result) => {
            if (err) throw err;
        });
    });
};

const viewItem = (table) => {
    connection.query("SELECT * FROM " + table, (err, response) => {
        if (err) throw err;
        console.table(response);
    });
};