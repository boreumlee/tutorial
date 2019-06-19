//const naver = require('./app');
const {topTen,relUrl,relations,useAsync} = require('./appAsync');
const assert = require('chai').assert;
describe('naver 순위 연관검색어 리스트', function(){
    describe('relations', function() {

        it('1-10순위 페이지 list', async () => {
            this.timeout(5000)
            const result = await topTen('http://www.naver.com');
            console.log(result);
            assert.isArray(result);
            assert.lengthOf(result, 10);
        });

        it('각 순위 페이지의 html list', async () => {
            this.timeout(5000)
            const list = await topTen('http://www.naver.com');
            const result = await relUrl(list);
            console.log(result);
            assert.isArray(result);
            assert.lengthOf(result, 10);
        });
    
        it('연관검색어 list', async () => {
            this.timeout(5000)
            const list = await topTen('http://www.naver.com');
            const html = await relUrl(list);
            const result = await relations(html);
            console.log(result);
            assert.isArray(result);
            assert.lengthOf(result, 10);
            
        });
    
        it('연관검색어 list', async () => {
            this.timeout(5000)
            const result = await useAsync('http://www.naver.com');
            console.log(result);
            assert.isArray(result);
            assert.lengthOf(result, 10);
        });
    });

})


//topTen => 1 - 10 순위 페이지 return array list .length = 10
// relUrl => 각 순위 페이지의 htmlString return array list  