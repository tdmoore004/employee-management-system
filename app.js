// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const dotenv = require("dotenv");
const questions = require("./lib/questions");

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

// Function to initialize the application.
const start = () => {
    inquirer
        .prompt(questions.addOrUpdateQuestions).then((response) => {
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
                case "DELETE":
                    deleteWhat();
                    break;
                case "DONE":
                    connection.end();
                    break;
            };
        });
};

// Functions to determine what to add, view, update or delete.
const addWhat = () => {
    inquirer
        .prompt(questions.addViewWhatQuestions).then((response) => {
            switch (response.addViewWhat) {
                case "Department":
                    addDepartment();
                    break;
                case "Role":
                    addRole();
                    break;
                case "Employee":
                    addEmployee();
                    break;
            };
        });
};

const viewWhat = () => {
    inquirer
        .prompt(questions.addViewWhatQuestions).then((response) => {
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
        .prompt(questions.updateWhatQuestions).then((response) => {
            updateEmployee(response.updateWho, response.updateWhat, response.newItem);
        });
};

const deleteWhat = () => {
    inquirer
        .prompt(questions.addViewWhatQuestions).then((response) => {
            switch (response.addViewWhat) {
                case "Department":
                    deleteDepartment();
                    break;
                case "Role":
                    deleteRole();
                    break;
                case "Employee":
                    deleteEmployee();
                    break;
            };
        });
};

// Functions to add a Department, Role or Employee.
const addDepartment = () => {
    inquirer
        .prompt(questions.addDepartmentQuestion).then((response) => {
            connection.query("INSERT INTO department (name) VALUES (?)", [response.departmentName], (err, result) => {
                if (err) throw err;
            });
            reRun();
        });
};

const addRole = () => {
    inquirer
        .prompt(questions.addRoleQuestions).then((response) => {
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [response.roleTitle, response.roleSalary, response.roleDepartment], (err, result) => {
                if (err) throw err;
            });
            reRun();
        });
};

const addEmployee = () => {
    inquirer
        .prompt(questions.addEmployeeQuestions).then((response) => {
            if (response.managerId === "") {
                response.managerId = null;
            }
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
    connection.query("SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department ON (role.department_id = department.id)", (err, response) => {
        if (err) throw err;
        console.table(response);
        reRun();
    });
};

const viewEmployee = () => {
    connection.query("SELECT e.id, concat(e.first_name, ' ', e.last_name) AS employee, role.title, concat(m.first_name, ' ', m.last_name) AS manager FROM employee e LEFT JOIN role ON (e.role_id = role.id) LEFT JOIN employee m ON (e.manager_id = m.id)", (err, response) => {
        if (err) throw err;
        console.table(response);
        reRun();
    });
};

// Function for updating employee's roles and managers.
const updateEmployee = (whoUpdate, whatUpdate, newItem) => {
    switch (whatUpdate) {
        case "Role":
            connection.query("UPDATE employee SET role_id = " + newItem + " WHERE id = " + whoUpdate, (err, result) => {
                if (err) throw err;
                reRun();
            });
            break;
        case "Manager":
            if (newItem === "") {
                newItem = null;
            }
            connection.query("UPDATE employee SET manager_id = " + newItem + " WHERE id = " + whoUpdate, (err, result) => {
                if (err) throw err;
                reRun();
            });
            break;
    };
};

// Function for deleting an department, role or employee.
const deleteDepartment = () => {
    inquirer
        .prompt(questions.deleteDepartment).then((response) => {
            connection.query("DELETE FROM department WHERE id = " + response.deleteDepartment, (err, result) => {
                if (err) throw err;
                reRun();
            });
        });
};

const deleteRole = () => {
    inquirer
        .prompt(questions.deleteRole).then((response) => {
            connection.query("DELETE FROM role WHERE id = " + response.deleteRole, (err, result) => {
                if (err) throw err;
                reRun();
            });
        });
};

const deleteEmployee = () => {
    inquirer
        .prompt(questions.deleteEmployee).then((response) => {
            connection.query("DELETE FROM employee WHERE id = " + response.deleteEmployee, (err, result) => {
                if (err) throw err;
                reRun();
            });
        });
};

const reRun = () => {
    inquirer
        .prompt(questions.reRunQuestion).then((response) => {
            if (response.reRun === "Yes") {
                start();
            } else {
                connection.end();
            };
        });
};