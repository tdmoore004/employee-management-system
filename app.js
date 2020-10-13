// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");
const dotenv = require("dotenv");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
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
            name: "addOrEdit",
            type: "list",
            message: "Would you like to ADD or EDIT a department, role or employee?",
            choices: ["ADD", "EDIT", "DONE"],
        }).then((response) => {
            if (response.addOrEdit === "ADD") {
                addItem();
            } else if (response.addOrEdit === "EDIT") {
                editItem();
            } else {
                connection.end();
            }
        });
};