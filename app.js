const {
    getFullLaptopUrlFromPcworld,
} = require('./laptops-from-pcworld/get-links');

const {
    getLaptopInfoFromPcworld,
} = require('./laptops-from-pcworld/get-laptops-info');

const {
    getFullLaptopUrlFromArgos,
} = require('./laptops-from-argos/get-links.js');

const {
    getLaptopInfoFromArgos,
} = require('./laptops-from-argos/get-laptops-info.js');

const run = async () => {
    const pcworldUrls = await getFullLaptopUrlFromPcworld();
    pcworldUrls.forEach(async (url) => {
        const laptop = await getLaptopInfoFromPcworld(url);
        console.log(laptop);
    });

    const argosUrls = await getFullLaptopUrlFromArgos();
    argosUrls.forEach(async (url) => {
        const laptop = await getLaptopInfoFromArgos(url);
        console.log(laptop);
    });
};

run();
