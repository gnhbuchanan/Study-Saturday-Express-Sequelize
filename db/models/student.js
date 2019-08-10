'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define('student', {

    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }
});

Student.beforeCreate((student) => {
    let capFirst = student.firstName.toUpperCase();
    let lowFirst = student.firstName.slice(1);
    student.firstName = capFirst[0] + lowFirst;

    let capLast = student.lastName.toUpperCase();
    let lowLast = student.lastName.slice(1);
    student.lastName = capLast[0] + lowLast;

})

module.exports = Student;
