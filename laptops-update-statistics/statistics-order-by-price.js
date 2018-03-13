/* globals process */

require('console.table');
const db = require('../models');
const {
        laptop,
    } = db;


const run = async () => {
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
        ];
        values.push(table);
    });
    console.table(['name', 'price'], values);
};

run();
