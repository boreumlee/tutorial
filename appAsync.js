const rp = require('request-promise');
const cheerio = require('cheerio');
//1 - 10 순위 뽑기
const topTen = async (url) => {
    try {
        const list =[];
        const $ = await rp({uri: url, transform: body => cheerio.load(body)});
        $('div[class="ah_list PM_CL_realtimeKeyword_list_base"]').find('ul > li > a[class=ah_a]').each((index, element) => {
            if(index < 10){
              list.push($(element).attr('href'));
            }
        });
        return list;
    } catch (error) {
        console.log(error)
    }
};
//각 순위 search페이지 
const relUrl = list => {
    return list.map( async (element) => {
        return await rp({uri: element});  //return htmlString 
    });
};
//연관검색어 
const relations = async relUrl => {
    try {
        const values = await Promise.all(relUrl);
        return values.map(ele => {
            const $ = cheerio.load(ele);
            const relation = []
            $('ul[class=_related_keyword_ul]').find('li > a').each((index, element) => {
              relation.push($(element).text());
            })
            return relation;
          })    
    } catch (error) {
        console.log(error);
    }
};

const useAsync = async (url) => {
    try {
        const list = await topTen(url);
        const searchPage = await relUrl(list);
        const relList = await relations(searchPage);
        // console.log(relList);
        return relList;
    } catch (error) {
        console.log(error);
    }
}
useAsync('http://www.naver.com');

module.exports = {
    topTen,
    relUrl,
    relations,
    useAsync
};