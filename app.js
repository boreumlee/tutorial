var rp = require('request-promise');
var cheerio = require('cheerio'); // Basically jQuery for node.js

let list = [];
let relations=[];

let naver = rp({uri: 'http://www.naver.com', transform: function (body) {return cheerio.load(body);}})
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
      let rel1= rp({uri: list[0]}).then(function(htmlString){return htmlString; })
      let rel2= rp({uri: list[1]}).then(function(htmlString){return htmlString; })
      let rel3= rp({uri: list[2]}).then(function(htmlString){return htmlString; })
      let rel4= rp({uri: list[3]}).then(function(htmlString){return htmlString; })
      let rel5= rp({uri: list[4]}).then(function(htmlString){return htmlString; })
      let rel6= rp({uri: list[5]}).then(function(htmlString){return htmlString; })
      let rel7= rp({uri: list[6]}).then(function(htmlString){return htmlString; })
      let rel8= rp({uri: list[7]}).then(function(htmlString){return htmlString; })
      let rel9= rp({uri: list[8]}).then(function(htmlString){return htmlString; })
      let rel10= rp({uri: list[9]}).then(function(htmlString){return htmlString; })
      
      Promise.all([rel1,rel2,rel3,rel4,rel5,rel6,rel7,rel8,rel9,rel10]).then(function(values){
        values.map(ele=>{
          const $ = cheerio.load(ele);
          let relation = []
          $('ul[class=_related_keyword_ul]').find('li > a').each(function(index, element){
            relation.push($(element).text());
          })
          relations.push(relation);
        })
        console.log('relations',relations);
      })
    })
    .catch(function (err) {
      console.log(err);
    });
  
module.exports = naver;