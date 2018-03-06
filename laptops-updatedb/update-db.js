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
