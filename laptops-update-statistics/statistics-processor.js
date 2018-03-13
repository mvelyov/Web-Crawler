/* globals process */

require('console.table');
const db = require('../models');
const {
        laptop,
    } = db;

const run = async () => {
    const findProcessorCondition = {
        where: {
            processor: {},
        },
    };

    const args = process.argv[2];
    const [condition, parameter] = args.split('-');
    findProcessorCondition.where.processor[condition] = `%${parameter}%`;

    let table;
    const values = [];
    (await laptop.findAll(findProcessorCondition)).map((item) => {
        table = [item.dataValues.fullName,
            `£${item.dataValues.price}.00`,
            `${item.dataValues.processor}`,
        ];
        values.push(table);
    });
    console.table(['name', 'price', 'processor'], values);
};

run();
