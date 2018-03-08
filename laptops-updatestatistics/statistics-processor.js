const {
    sequelize,
    laptop,
} = require('./config.js');

const run = async () => {
    await sequelize.sync();

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
