const naver = require('./app');

describe('Task1, 네이버 실시간 순위의 연관검색어',()=>{
    it.only('http://www.naver.com', ()=>{
        naver('http://www.naver.com').then(list=>
            expect(Array.isArray(list)).toBeTruthy()
        )
    }).timeout(5000);

    it('http://www.google.com', ()=>{
        naver('http://www.google.com').then(list=>{
            //return 빈배열
        })
    }).timeout(5000);

    it('http://www.naver, return error메세지', ()=>{
        naver('http://www.naver').then(list=>{
            //throw error
        })
    }).timeout(5000);
});