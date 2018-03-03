/* global Set */

const {
    JSDOM,
} = require('jsdom');

const $init = require('jquery');
const _ = require('lodash');

const pcworldFullUrl = 'https://www.pcworld.co.uk/gbuk/computing/laptops/laptops/703_7006_70006_xx_ba00010671-bv00308565%7Cbv00308568/1_50/relevance-desc/xx_xx_xx_xx_5-6-7-8-9-10-11-12-13-14-15-16-17-18-19-20-21-22-23-24-25-26-27-28-criteria.html';

const getPaginationUrls = async () => {
    const dom = await JSDOM.fromURL(pcworldFullUrl);
    const $ = $init(dom.window);
    let pageLinksSelector = '.pagination a';
    pageLinksSelector = [...$(pageLinksSelector)];
    return pageLinksSelector.map((link) => $(link))
        .map(($link) => $link.attr('href'));
};

const getFullLaptopUrlFromPcworld = async () => {
    const urls = new Set();
    let paginationUrls = await getPaginationUrls();
    paginationUrls.push(pcworldFullUrl);
    paginationUrls.sort().pop();
    paginationUrls.forEach((page) => urls.add(page));
    paginationUrls = [...urls.values()];

    const links =
        (await Promise.all(paginationUrls.map((pageUrl) =>
            JSDOM.fromURL(pageUrl))))
        .map((dom) => $init(dom.window))
        .map(($) => [...$('.in')]
            .map((link) => $(link)
                .attr('href')));

    return _.chain(links)
        .flatten()
        .sortedUniq()
        .value();
};

module.exports = {
    getFullLaptopUrlFromPcworld,
};

