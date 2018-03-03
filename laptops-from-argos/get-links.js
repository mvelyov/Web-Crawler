/* global Set */

const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');
const _ = require('lodash');

const argosUrl = 'http://www.argos.co.uk/browse/technology/laptops-and-pcs/laptops-and-netbooks/c:30049/type:laptops/opt/page:3/';

const getPaginationUrls = async () => {
    const dom = await JSDOM.fromURL(argosUrl);
    const $ = $init(dom.window);
    let pageLinksSelector = '.pagination__li a';
    pageLinksSelector = [...$(pageLinksSelector)];
    return pageLinksSelector.map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

const getLaptopUrl = async () => {
    const urls = new Set();
    let pageUrls = await getPaginationUrls();
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


const getFullLaptopUrlFromArgos = async () => {
    const argosLink = 'http://www.argos.co.uk';
    const arr = await getLaptopUrl();
    const fullLaptopLinks = arr.map((link) => argosLink + link);
    return fullLaptopLinks;
};

module.exports = {
    getFullLaptopUrlFromArgos,
};

