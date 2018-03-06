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

    const findRamCondition = {
        'where': {
            'ram': {},
        },
    };

    const args = process.argv[2];
    const [condition, parameter] = args.split('-');
    findRamCondition.where.ram[condition] = parameter;

    let table;
    const values = [];
    (await laptop.findAll(findRamCondition)).map((item) => {
        table = [item.dataValues.fullName,
            `£${item.dataValues.price}.00`,
            `${item.dataValues.ram} GB`,
        ];
        values.push(table);
    });

    console.table(['name', 'price', 'ram'], values);
};

run();
