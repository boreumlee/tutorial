const naver = require('./app');

describe('Task1, 네이버 실시간 순위의 연관검색어',()=>{
    it.only('http://www.naver.com', ()=>{
        naver('http://www.naver.com').then(list=>
            assert.isArray(list)
        )
    }).timeout(5000);

});