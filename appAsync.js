const rp = require('request-promise');
const cheerio = require('cheerio');
//1 - 10 순위 뽑기
const getTopTen = async url => {
    try {
        const list = [];
        const $ = await rp({ uri: url, transform: body => cheerio.load(body) });
        $('div[class="ah_list PM_CL_realtimeKeyword_list_base"]')
            .find('ul > li > a[class=ah_a]')
            .each((index, element) => {
                if (index < 10) {
                    list.push($(element).attr('href'));
                }
            });
        return list;
    } catch (error) {
        console.log(error);
    }
};
//각 순위 search페이지
const getSearchPageHTML = async link => {
    const $ = await rp({ uri: link, transform: body => cheerio.load(body) });
    return $.html();
};
//연관검색어
const getRelatedKeyword = html => {
    const $ = cheerio.load(html);
    const relations = [];
    $('ul[class=_related_keyword_ul]')
        .find('li > a')
        .each((index, element) => {
            relations.push($(element).text());
        });
    return relations;
};

const getRelatedKeywordsOfTopTenKeywords = async url => {
    try {
        const topTenLinks = await getTopTen(url);
        const topTenHTMLs = await Promise.all(
            topTenLinks.map(async link => {
                return await getSearchPageHTML(link);
            }),
        );
        const relList = topTenHTMLs.map(html => {
            return getRelatedKeyword(html);
        });
        return relList;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getTopTen,
    getSearchPageHTML,
    getRelatedKeyword,
    getRelatedKeywordsOfTopTenKeywords,
};
