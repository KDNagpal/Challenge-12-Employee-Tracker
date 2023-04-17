const inquirer = require('inquirer');
const mysql = require('mysql2');
const questions = require('./questions');
const cTable = require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '123123',
        database:'employee_db'
    },
    console.log('Connected to employee_db database.')
);

console.log("hello")