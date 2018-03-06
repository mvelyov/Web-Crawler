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
    const laptops = (await laptop.findAll({ where: { ram: { gte: 8 } } }));
    laptops.forEach((item) => {
    table = [item.dataValues.fullName,
        `£${item.dataValues.price}.00`,
        `${item.dataValues.ram} GB`];
            values.push(table);
        });
console.table(['name', 'price', 'ram'], values);
};

run();

