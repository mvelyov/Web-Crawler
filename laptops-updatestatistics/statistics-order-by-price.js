require('console.table');

const config = require('./db-config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

const db = require('../models');
const {
    laptop,
} = db;
let table;
const values = [];
const run = async () => {
    await sequelize.sync();
    const laptops = (await laptop.findAll({ order: ['price'] }));
    laptops.forEach((item) => {
            table = [item.dataValues.fullName, `£${item.dataValues.price}.00`];
            values.push(table);
        });
console.table(['name', 'price'], values);
};

run();
