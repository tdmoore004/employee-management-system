// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
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
                            start();
                        } else if (response.addViewWhat === "Role") {
                            start();
                        } else if (response.addViewWhat === "Employee") {
                            start();
                        };
                    });
            } else if (response.addOrUpdate === "VIEW") {
                inquirer
                    .prompt(addViewWhat).then((response) => {
                        if (response.addViewWhat === "Department") {
                            start();
                        } else if (response.addViewWhat === "Role") {
                            start();
                        } else if (response.addViewWhat === "Employee") {
                            start();
                        };
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