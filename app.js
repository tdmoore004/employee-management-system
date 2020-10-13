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
    if(err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    init();
});

