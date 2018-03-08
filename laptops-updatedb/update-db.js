const configuration = require('./database-config.json');
const sql = require('./sql');

sql.setup(configuration);

const {
    getAllLaptops,
} = require('../laptops-all/get-all-laptops.js');

const updateDatabase = async () => {
    const laptops = await getAllLaptops();

    laptops.map(async (laptop) => {
        const brand = laptop[0];
        const price = laptop[1];
        const fullName = laptop[2];
        const os = laptop[3];
        const ram = laptop[4];
        const storage = laptop[5];
        const processor = laptop[6];
        const website = laptop[7];

        const getBrandId = `SELECT id
        FROM brands
        WHERE name='${brand}'`;

        let id = (await sql.execute(getBrandId)).map((row) => (row.id));
        let brandId;
        if (id.length === 0) {
            const insertBrandName = `
                 INSERT IGNORE INTO brands (name)
                 VALUES ('${brand}')`;
            sql.execute(insertBrandName);
            id = (await sql.execute(getBrandId)).map((row) => row.id);
            brandId = id[0];
        } else {
            id = (await sql.execute(getBrandId)).map((row) => row.id);
            brandId = id[0];
        }


        const osFullNames = `
    SELECT id FROM os
    WHERE name='${os}'`;

        const getOsId = (await sql.execute(osFullNames))
            .map((row) => (row.id));
        const oId = getOsId[0];

        const websiteFullNames = `
    SELECT id FROM websites
    WHERE name='${website}'`;

        const getWebsiteID = (await sql.execute(websiteFullNames))
            .map((row) => (row.id));
        const websiteId = getWebsiteID[0];

        const insertAllColumns = `
    INSERT INTO 
    laptops (fullName, price, ram, storage, 
        processor, brandId, oId, websiteId)
    VALUES
    ('${fullName}', '${price}','${ram}','${storage}', 
    '${processor}', '${brandId}', '${oId}', '${websiteId}')`;

        await sql.execute(insertAllColumns);
    });
    return 'Database updated!';
};

const run = async () => {
    const result = await updateDatabase();
    console.log(result);
};

run();


// const Sequelize = require('sequelize');
// const sequelize = new Sequelize(configuration);

// const {
//     getAllLaptops,
// } = require('../laptops-all/get-all-laptops.js');

// const {
//     brand,
//     os,
//     website,
//     laptop,
// } = require('../models');

// const updateDatabase = async () => {
//     await sequelize.sync();
//     const laptops = await getAllLaptops();

//     laptops.map(async (laptopItem) => {
//         const brandName = laptopItem[0];
//         const price = laptopItem[1];
//         const fullName = laptopItem[2];
//         const osType = laptopItem[3];
//         const ram = laptopItem[4];
//         const storage = laptopItem[5];
//         const processor = laptopItem[6];
//         const websiteName = laptopItem[7];

//         let brandId = (await brand.findOrCreate({
//             where: {
//                 name: brandName,
//             },
//         }));
//         brandId = brandId[0].dataValues.id;


//         let oId = (await os.findOne({
//             where: {
//                 name: osType,
//             },
//         }));
//         oId = oId.dataValues.id;

//         let websiteId = (await website.findOne({
//             where: {
//                 name: websiteName,
//             },
//         }));
//         websiteId = websiteId.dataValues.id;

//         // first option
//         await laptop.create({
//             fullName: fullName,
//             price: price,
//             ram: ram,
//             storage: storage,
//             processor: processor,
//             brandId: brandId,
//             oId: oId,
//             websiteId: websiteId,
//         });

//         // second option
//         //     const insertAllColumns = `
//         // INSERT INTO laptops
//         //         (fullName, price, ram, storage,
//         //         processor, brandId, oId, websiteId)
//         // VALUES
//         //         ('${fullName}', '${price}','${ram}','${storage}',
//         //         '${processor}', '${brandId}', '${oId}', '${websiteId}')`;

//         // await sequelize.query(insertAllColumns);
//     });
//     return 'Database updated!';
// };

// const run = async () => {
//     const result = await updateDatabase();
//     console.log(result);
// };

// run();
