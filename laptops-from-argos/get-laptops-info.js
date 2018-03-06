const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');

const getLaptopInfoFromArgos = async (url) => {
    const addData = async () => {
        const dom = await JSDOM.fromURL(url);
        const $ = $init(dom.window);

        const getLaptopName = () => {
            let pageLinksSelector = 'h1.product-name-main span';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.text());
        };

        const getLaptopPrice = () => {
            let pageLinksSelector = 'li.price.product-price-primary';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.attr('content'));
        };


        const getLaptopParametres = () => {
        let pageLinksSelector = '.product-description-content-text li:lt(6)';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.text());
        };

        const getLaptopBrand = () => {
            let pageLinksSelector = 'a.a';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.text());
        };

        return {
            getLaptopName,
            getLaptopPrice,
            getLaptopParametres,
            getLaptopBrand,
        };
    };

    const addLaptop = async () => {
        const data = await addData();
        const brand = data.getLaptopBrand()[0].toUpperCase();
        let fullName = data.getLaptopName()[0].split(' ');
        fullName[0] = brand;
        fullName = fullName.join(' ');
        const getPrice = `${data.getLaptopPrice()[0]}`;
        const price = parseFloat(getPrice.replace( /[^\d\.]*/g, ''));
        const item1 = data.getLaptopParametres()[0];
        const processor = item1;
        let item2 = data.getLaptopParametres()[2];
        item2 = item2.split(' ')[0];
        let ram = item2;
        const item3 = data.getLaptopParametres()[3];
        const item4 = data.getLaptopParametres()[4];
        const item5 = data.getLaptopParametres()[5];

        let storage;
        if (item3.includes('and') && item3.startsWith(' and')) {
            storage = item3.split(' ');
            storage = `${storage[2]} ${storage[3]}`;
        } else if (item3.includes('and') && !(item3.startsWith(' and'))) {
            storage = item3.split(' ');
            storage = `${storage[0]} ${storage[3]}`;
        } else {
            storage = item3.split(' ');
            storage = `${storage[0]} ${storage[1]}`;
        }

        let os;
        if (item4.includes('Hard drive')) {
            os = item5.split(' ');
            os = `${os[1]} ${os[2]}`.slice(0, -1);
        } else {
            os = item4.split(' ');
            os = `${os[1]} ${os[2]}`.slice(0, -1);
        }
        const website = 'http://www.argos.co.uk/';
        if (ram.includes('1TB')) {
            ram = '8GB';
            storage = '1TB HDD';
        }
        ram = parseFloat(ram.replace( /[^\d\.]*/g, ''));
        return [brand, price, fullName, os, ram, storage, processor, website];
    };
    return addLaptop();
};

module.exports = {
    getLaptopInfoFromArgos,
};
