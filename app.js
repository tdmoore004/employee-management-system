// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const dotenv = require("dotenv");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "TiUP&c4tY2",
    database: "employee_management_db",
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    start();
});

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
                    .prompt({
                        name: "addWhat",
                        type: "list",
                        message: "What do you want to add?",
                        choices: ["Department", "Role", "Employee"]
                    }).then((response) => {
                        if (response.addWhat === "Department") {
                            start();
                        } else if (response.addWhat === "Role") {
                            start();
                        } else if (response.addWhat === "Employee") {
                            start();
                        };
                    });
            } else if (response.addOrUpdate === "UPDATE") {
                inquirer
                    .prompt({
                        name: "updateWhat",
                        type: "list",
                        message: "What do you want to update?",
                        choices: ["Department", "Role", "Employee"]
                    }).then((response) => {
                        if (response.updateWhat === "Department") {
                            start();
                        } else if (response.updateWhat === "Role") {
                            start();
                        } else if (response.updateWhat === "Employee") {
                            start();
                        };
                    });
            } else if (response.addOrUpdate === "VIEW") {
                inquirer
                    .prompt({
                        name: "viewWhat",
                        type: "list",
                        message: "What do you want to view?",
                        choices: ["Department", "Role", "Employee"]
                    }).then((response) => {
                        if (response.viewWhat === "Department") {
                            start();
                        } else if (response.viewWhat === "Role") {
                            start();
                        } else if (response.viewWhat === "Employee") {
                            start();
                        };
                    });
            } else {
                connection.end();
            }
        });
};