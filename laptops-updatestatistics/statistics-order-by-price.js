require('console.table');

const config = require('./db-config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config);

const db = require('../models');
const {
    laptop,
} = db;


const run = async () => {
    await sequelize.sync();

    let table;
    const values = [];

    const findOrder = {
        order: [],
    };

    const args = process.argv[2];
    findOrder.order.push(args);
    (await laptop.findAll(findOrder)).map((item) => {
        table = [item.dataValues.fullName,
            `£${item.dataValues.price}.00`,
            `${item.dataValues.storage}`,
        ];
        values.push(table);
    });
    console.table(['name', 'price', 'storage'], values);
};

run();
