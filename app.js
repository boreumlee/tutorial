const rp = require('request-promise');
const cheerio = require('cheerio'); // Basically jQuery for node.js

const list = [];

const naver = rp({uri: 'http://www.naver.com', transform: function (body) {return cheerio.load(body);}})
    .then(function ($) {
      $('div[class="ah_list PM_CL_realtimeKeyword_list_base"]').find('ul > li > a[class=ah_a]').each(function (index, element) {
        if(index < 10){
          list.push($(element).attr('href'));
          // console.log($(element).find('.ah_k').text())
        }
      });
      return list;
    })
    .then(function(list){
      const relUrl = list.map((element)=>{
        return rp({uri: element}).then(function(htmlString){return htmlString; });
      })
      Promise.all(relUrl).then(function(values){
        const relations = values.map(ele=>{
          const $ = cheerio.load(ele);
          const relation = []
          $('ul[class=_related_keyword_ul]').find('li > a').each(function(index, element){
            relation.push($(element).text());
          })
          return relation;
        })
        console.log('relations',relations);
      })
    })
    .catch(function (err) {
      console.log(err);
    });
  
module.exports = naver;