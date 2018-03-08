const consoleTable = require('console.table');

const config = require('./db-config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

const db = require('../models');
const {
        laptop,
    } = db;

module.exports = {
    consoleTable,
    config,
    Sequelize,
    sequelize,
    laptop,
};
