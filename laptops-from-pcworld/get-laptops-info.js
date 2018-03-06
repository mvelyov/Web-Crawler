const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const getLaptopInfoFromPcworld = async (url) => {
    const addData = async () => {
        const dom = await JSDOM.fromURL(url);
        const $ = $init(dom.window);

        const getLaptopName = () => {
            let laptopName = 'h1.page-title span';
            laptopName = [...$(laptopName)];
            return laptopName.map((link) => $(link))
                .map(($link) => $link.text());
        };

        const getLaptopPrice = () => {
            let laptopPrice = 'strong.current';
            laptopPrice = [...$(laptopPrice)];
            return laptopPrice.map((link) => $(link))
                .map(($link) => $link.text());
        };


        const getLaptopParametres = () => {
            let laptopParametres = '.to-print li';
            laptopParametres = [...$(laptopParametres)];
            return laptopParametres.map((link) => $(link))
                .map(($link) => $link.text());
        };

        return {
            getLaptopName,
            getLaptopPrice,
            getLaptopParametres,
        };
    };

    const addLaptop = async () => {
        const data = await addData();
        const name = data.getLaptopName();
        const [brand, fullName] = [name[0], name.join(' ')];
        const getPrice = data.getLaptopPrice()[0];
        const price = parseFloat(getPrice.replace( /[^\d\.]*/g, ''));

        if (brand === 'APPLE' ||
        brand === 'GOOGLE' ||
        fullName === 'ASUS Flip C302 2 in 1 Chromebook - Silver' ||
        fullName === 'HP Pavilion 15-bc250na 15.6" Gaming Laptop - Silver' ||
        fullName === 'HP ENVY x360 15.6" 2 in 1 - Ash Silver') {
            let os = data.getLaptopParametres()[0];
            let processor = data.getLaptopParametres()[1];
            const parametres = data.getLaptopParametres()[2];

            if (os.includes('Windows 10')) {
                os = os.split(' ');
                os = `${os[0]} ${os[1]}`;
            }
            if (os.includes('MacOS') || os.includes('Chrome OS')) {
                os = os;
            } else {
                os = 'Windows 10';
            }
            let [ram, storage] = parametres.split(' / ');
            if (ram.includes('OneDrive')) {
                ram = '4GB';
                processor = 'Intel® Pentium® N3710 Processor';
            } else {
                ram = ram.split(' ');
                ram = `${ram[1]}${ram[2]}`;
            }
            if (typeof storage === 'undefined') {
                storage = '32 GB eMMC';
            } else {
                storage = storage.split(': ')[1].split(' ');
                storage = `${storage[0]}${storage[1]} ${storage[2]}`;
            }
            const website = 'https://www.pcworld.co.uk/';
            ram = parseFloat(ram.replace( /[^\d\.]*/g, ''));
        return [brand, price, fullName, os, ram, storage, processor, website];
        }
        let os = data.getLaptopParametres()[1];
        let processor = data.getLaptopParametres()[2];
        const parametres = data.getLaptopParametres()[3];
        if (os.includes('Windows 10')) {
            os = os.split(' ');
            os = `${os[0]} ${os[1]}`;
        }
        if (os.includes('MacOS') || os.includes('Chrome OS')) {
            os = os;
        } else {
            os = 'Windows 10';
        }

        let [ram, storage] = parametres.split(' / ');
        if (ram.includes('OneDrive')) {
            ram = '4GB';
            processor = 'Intel® Pentium® N3710 Processor';
        } else {
            ram = ram.split(' ');
            ram = `${ram[1]}${ram[2]}`;
        }
        if (typeof storage === 'undefined') {
            storage = '32 GB eMMC';
        } else {
            storage = storage.split(': ')[1].split(' ');
            storage = `${storage[0]}${storage[1]} ${storage[2]}`;
        }
        const website = 'https://www.pcworld.co.uk/';
        ram = parseFloat(ram.replace( /[^\d\.]*/g, ''));
        return [brand, price, fullName, os, ram, storage, processor, website];
    };
    return addLaptop();
};

module.exports = {
    getLaptopInfoFromPcworld,
};
