const rp = require('request-promise');
const cheerio = require('cheerio'); // Basically jQuery for node.js

const list = [];

const naver = rp({uri: 'http://www.naver.com', transform: body => cheerio.load(body)})
    .then($ => {
      $('div[class="ah_list PM_CL_realtimeKeyword_list_base"]').find('ul > li > a[class=ah_a]').each((index, element) => {
        if(index < 10){
          list.push($(element).attr('href'));
          // console.log($(element).find('.ah_k').text())
        }
      });
      return list;
    })
    .then(list => {
      const relUrl = list.map(element => {
        return rp({uri: element}).then(htmlString => htmlString);
      })
      return Promise.all(relUrl).then(values => {
        return values.map(ele => {
          const $ = cheerio.load(ele);
          const relation = []
          $('ul[class=_related_keyword_ul]').find('li > a').each((index, element) => {
            relation.push($(element).text());
          })
          return relation;
        })
      })
    })
    .catch(err => {
      console.log(err);
    });
module.exports = naver;