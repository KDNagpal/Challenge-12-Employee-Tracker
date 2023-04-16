DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments(
    id INT NOT NULL AUTO_INCREMNT PRIMARY KEY,
    department_name VARCHAR(60)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMNT PRIMARY KEY,
    title VARCHAR(60),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES departments (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMNT PRIMARY KEY,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles (id)
    FOREIGN KEY (manager_id) REFERENCES employees (id)
);