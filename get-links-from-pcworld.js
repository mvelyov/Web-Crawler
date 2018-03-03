/* global Set */

const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');
const _ = require('lodash');

const url = 'https://www.pcworld.co.uk/gbuk/computing/laptops/laptops/703_7006_70006_xx_xx/1_50/relevance-desc/400-2500_xx_xx_xx_5-6-7-8-9-10-11-12-13-14-15-16-17-18-19-20-21-22-23-24-25-26-27-28-criteria.html';

const extractPageUrls = async () => {
    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    let pageLinksSelector = '.pagination a';
    pageLinksSelector = [...$(pageLinksSelector)];
    return pageLinksSelector.map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

const gerLaptopUrl = async () => {
    const urls = new Set();
    let pageUrls = await extractPageUrls();
    pageUrls.push(url);
    pageUrls.sort().pop();
    pageUrls.forEach((page) => urls.add(page));
    pageUrls = [...urls.values()];

    const links =
        (await Promise.all(pageUrls.map((pageUrl) => JSDOM.fromURL(pageUrl))))
        .map((dom) => $init(dom.window))
        .map(($) => [...$('.in')]
            .map((link) => $(link)
                .attr('href')));

    return _.chain(links)
        .flatten()
        .sortedUniq()
        .value();
};

const func = async (url1) => {
    const addData = async () => {
        // const url1 = 'https://www.pcworld.co.uk/gbuk/computing/laptops/laptops/dell-inspiron-13-5000-13-3-2-in-1-era-grey-10174163-pdt.html';
        const dom = await JSDOM.fromURL(url1);
        const $ = $init(dom.window);
        // get text
        const example = () => {
            let pageLinksSelector = 'h1.page-title span';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.text());
        };

        // get price
        const example1 = () => {
            let pageLinksSelector = 'strong.current';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.text());
        };


        // get OS, RAM, Storage, Graphics
        const example2 = () => {
            let pageLinksSelector = '.to-print li';
            pageLinksSelector = [...$(pageLinksSelector)];
            return pageLinksSelector.map((link) => $(link))
                .map(($link) => $link.text());
        };

        return {
            example,
            example1,
            example2,
        };
    };

    const addLaptop = async () => {
        const data = await addData();
        const name = data.example();
        const [brand, fullName] = [name[0], name.join(' ')];
        let price = data.example1();
        price = price[0];

        if (brand === 'APPLE' ||
            brand === 'GOOGLE' ||
            fullName === 'ASUS Flip C302 2 in 1 Chromebook - Silver' ||
            fullName === 'HP Pavilion 15-bc250na 15.6" Gaming Laptop - Silver' ||
            fullName === 'HP ENVY x360 15.6" 2 in 1 - Ash Silver') {
            let [OS, processor, parametres] = data.example2();
            if (OS.includes('Windows 10')) {
                OS = OS.split(' ');
                OS = `${OS[0]} ${OS[1]}`;
            }
            if (OS.includes('MacOS') || OS.includes('Chrome OS')) {
                OS = OS;
            } else {
                OS = 'Windows 10';
            }
            let [RAM, storage] = parametres.split(' / ');
            RAM = RAM.split(' ');
            RAM = `${RAM[1]}${RAM[2]}`;
            storage = storage.split(': ')[1].split(' ');
            storage = `${storage[0]}${storage[1]} ${storage[2]}`;
            return [brand, price, fullName, OS, RAM, storage, processor];
        }
        let [, OS, processor, parametres] = data.example2();
        if (OS.includes('Windows 10')) {
            OS = OS.split(' ');
            OS = `${OS[0]} ${OS[1]}`;
        }
        if (OS.includes('MacOS') || OS.includes('Chrome OS')) {
            OS = OS;
        } else {
            OS = 'Windows 10';
        }

        let [RAM, storage] = parametres.split(' / ');
        RAM = RAM.split(' ');
        RAM = `${RAM[1]}${RAM[2]}`;
        storage = storage.split(': ')[1].split(' ');
        storage = `${storage[0]}${storage[1]} ${storage[2]}`;
        return [brand, price, fullName, OS, RAM, storage, processor];
    };
    return addLaptop();
};

const run = async () => {
    const urls = await gerLaptopUrl();
    urls.forEach(async (urll) => {
        const laptop = await func(urll);
        console.log(laptop);
    });
};

run();
