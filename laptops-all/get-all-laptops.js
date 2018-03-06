const {
    getFullLaptopUrlFromPcworld,
} = require('../laptops-from-pcworld/get-links');

const {
    getLaptopInfoFromPcworld,
} = require('../laptops-from-pcworld/get-laptops-info');

const {
    getFullLaptopUrlFromArgos,
} = require('../laptops-from-argos/get-links.js');

const {
    getLaptopInfoFromArgos,
} = require('../laptops-from-argos/get-laptops-info.js');

const getAllLaptops = async () => {
    const pcworldUrls = await getFullLaptopUrlFromPcworld();
    const laptopsFromPcworld =
    await Promise.all(pcworldUrls.map(async (item) => {
        const laptop = await getLaptopInfoFromPcworld(item);
        return laptop;
    }));

    const argosUrls = await getFullLaptopUrlFromArgos();
    const laptopsFromArgos = await Promise.all(argosUrls.map(async (item) => {
        const laptop = await getLaptopInfoFromArgos(item);
        return laptop;
    }));

    const allLaptops = [...laptopsFromPcworld, ...laptopsFromArgos];
    return allLaptops;
};

module.exports = {
    getAllLaptops,
};


