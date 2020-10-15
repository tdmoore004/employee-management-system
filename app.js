// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const dotenv = require("dotenv");

// Configuring dependencies.
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

// Variables with inquirer questions.
const addOrUpdateQuestions = {
    name: "addOrUpdate",
    type: "list",
    message: "Would you like to ADD or VIEW departments, roles or employees or UPDATE employee roles?",
    choices: ["ADD", "VIEW", "UPDATE", "DONE"]
};

const addViewWhatQuestions = {
    name: "addViewWhat",
    type: "list",
    message: "What do you want to add or view?",
    choices: ["Department", "Role", "Employee"]
};

const updateWhatQuestions = [
    {
        name: "updateWhat",
        type: "input",
        message: "What is the ID of the employee whose role you want to update?",
    },
    {
        name: "newRole",
        typw: "input",
        message: "What is the ID for their new role?"
    }
];

// Function to initialize the application.
const start = () => {
    inquirer
        .prompt(addOrUpdateQuestions).then((response) => {
            switch (response.addOrUpdate) {
                case "ADD":
                    addWhat();
                    break;
                case "VIEW":
                    viewWhat();
                    break;
                case "UPDATE":
                    updateWhat();
                    break;
                case "DONE":
                    connection.end();
                    break;
            };
        });
};

// Functions to determine what to add, view or update.
const addWhat = () => {
    inquirer
        .prompt(addViewWhatQuestions).then((response) => {
            switch (response.addViewWhat) {
                case "Department":
                    addDepartment();
                case "Role":
                    addRole();
                case "Employee":
                    addEmployee();
            };
        });
};

const viewWhat = () => {
    inquirer
        .prompt(addViewWhatQuestions).then((response) => {
            switch (response.addViewWhat) {
                case "Department":
                    viewDepartment();
                    break;
                case "Role":
                    viewRole();
                    break;
                case "Employee":
                    viewEmployee();
                    break;
            };
        });
};

const updateWhat = () => {
    inquirer
        .prompt(updateWhatQuestions).then((response) => {
            updateEmployeeRole(response.newRole, response.updateWhat);
        });
};

// Functions to add a Department, Role or Employee.
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
            reRun();
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
            reRun();
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
            reRun();
        });
};

// Function for viewing an item.
const viewDepartment = () => {
    connection.query("SELECT * FROM department", (err, response) => {
        if (err) throw err;
        console.table(response);
        reRun();
    });
};

const viewRole = () => {
    connection.query("SELECT role.id, role.title, department.name FROM role INNER JOIN department ON (role.department_id = department.id)", (err, response) => {
        if (err) throw err;
        console.table(response);
        reRun();
    });
};

const viewEmployee = () => {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee INNER JOIN role ON (employee.role_id = role.id)", (err, response) => {
        if (err) throw err;
        console.table(response);
        reRun();
    });
};

// Function for updating employee's roles.
const updateEmployeeRole = (newRole, id) => {
    connection.query("UPDATE employee SET role_id = " + newRole + " WHERE id = " + id, (err, result) => {
        if (err) throw err;
        reRun();
    });
};

const reRun = () => {
    inquirer
        .prompt({
            name: "reRun",
            type: "list",
            message: "Do you have more to do in EMS?",
            choices: ["Yes", "No"],
        }).then((response) => {
            if (response.reRun === "Yes") {
                start();
            } else {
                connection.end();
            };
        });
};