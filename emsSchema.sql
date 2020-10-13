-- Drops the employee_management_db if it already exists --
DROP DATABASE IF EXISTS employee_management_db;

-- Created the DB "employee_management_db" (only works on local connections)
CREATE DATABASE employee_management_db;

-- Use the DB employee_management_db for all the rest of the script
USE employee_management_db;

-- Created the table "department"
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

-- Created the table "role"
CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title DECIMAL(10,4) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id)
);

-- Created the table "employee"
CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY(id)
);