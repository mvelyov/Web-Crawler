/* global Set */

const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');
const _ = require('lodash');

const url = 'http://www.argos.co.uk/browse/technology/laptops-and-pcs/laptops-and-netbooks/c:30049/type:laptops/opt/page:3/';

const extractPageUrls = async () => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    let pageLinksSelector = '.pagination__li a';
    pageLinksSelector = [...$(pageLinksSelector)];
    return pageLinksSelector.map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

const gerLaptopUrl = async () => {
    const urls = new Set();
    let pageUrls = await extractPageUrls();
    pageUrls.sort();
    pageUrls.forEach((page) => urls.add(page));
    pageUrls = [...urls.values()];
    const argosLink = 'http://www.argos.co.uk';
    const fullUrls = pageUrls.map((link) => argosLink + link);

    const links =
        (await Promise.all(fullUrls.map((fullUrl) => JSDOM.fromURL(fullUrl))))
        .map((dom) => $init(dom.window))
        .map(($) => [...$('.ac-product-card__details')]
            .map((link) => $(link)
                .attr('href')));

    return _.chain(links)
        .flatten()
        .sortedUniq()
        .value();
};


const getFullLink = async () => {
    const argosLink = 'http://www.argos.co.uk';
    const arr = await gerLaptopUrl();
    const fullLaptopLinks = arr.map((link) => argosLink + link);
    return fullLaptopLinks;
};

const linksForEachLaptop = async () => {
    const links = await getFullLink();
    return links;
}

const func = async (url1) => {
    const addData = async () => {
        const dom = await JSDOM.fromURL(url1);
        const $ = $init(dom.window);

        // get fullname
        const example = () => {
            let pageLinksSelector = 'h1.product-name-main span';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.text());
        };

        // get brand
        const example3 = () => {
            let pageLinksSelector = 'a.a';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.text());
        };

        // get price
        const example1 = () => {
            let pageLinksSelector = 'li.price.product-price-primary';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.attr('content'));
        };


        // get OS, RAM, Storage, processor
        const example2 = () => {
            let pageLinksSelector = '.product-description-content-text li:lt(6)';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.text());
        };

        return {
            example,
            example1,
            example2,
            example3,
        };
    };

    const addLaptop = async () => {
        const data = await addData();
        const brand = data.example3()[0].toUpperCase();
        let fullName = data.example()[0].split(' ');
        fullName[0] = brand;
        fullName = fullName.join(' ');
        const price = `£${data.example1()[0]}`;
        let [item1, , item2, item3, item4, item5] = data.example2();
        item2 = item2.split(' ')[0];

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

        const ram = item2;

        const processor = item1;
        let os;

        if (item4.includes('Hard drive')) {
            os = item5.split(' ');
            os = `${os[1]} ${os[2]}`.slice(0, -1);
        } else {
            os = item4.split(' ');
            os = `${os[1]} ${os[2]}`.slice(0, -1);
        }
        return [brand, price, fullName, os, ram, storage, processor];
    };
    return addLaptop();
};

const run = async () => {
    const urls = await linksForEachLaptop();
    urls.forEach(async (urll) => {
        const laptop = await func(urll);
        console.log(laptop);
    });
};

run();
