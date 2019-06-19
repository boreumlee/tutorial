const {
    getTopTen,
    getSearchPageHTMLs,
    getRelatedKeywords,
    getRelatedKeywordsOfTopTenKeywords
} = require('./appAsync');
const assert = require('chai').assert;

describe('naver 순위 연관검색어 함수 단위 테스트', () => {
    describe('getTopTen', () => {
        it('http://www.naver.com', async () => {
            const result = await getTopTen('http://www.naver.com');
            console.log(result);
            assert.isArray(result);
            assert.lengthOf(result, 10);
        }).timeout(5000);

        it('http://www.google.com', async () => {
            const result = await getTopTen('http://www.google.com');
            console.log(result);
            assert.isArray(result);
            assert.lengthOf(result, 0);
        }).timeout(5000);
    });
    // TODO: 함수 별로 테스트 만들기 (배열을 받아서 배열을 return 하는 구조 변경 필요할 수도)
        // it('각 순위 페이지의 html list', async () => {
        //     const list = await getTopTen('http://www.naver.com');
        //     const result = await getSearchPageHTMLs(list);
        //     console.log(result);
        //     assert.isArray(result);
        //     assert.lengthOf(result, 10);
        // }).timeout(5000);

        // it('연관검색어 list', async () => {
        //     const list = await getTopTen('http://www.naver.com');
        //     const html = await getSearchPageHTMLs(list);
        //     const result = await getRelatedKeywords(html);
        //     console.log(result);
        //     assert.isArray(result);
        //     assert.lengthOf(result, 10);
        // }).timeout(5000);
});

describe('naver 순위 연관검색어 리스트', () => {
    it('연관검색어 list', async () => {
        const result = await getRelatedKeywordsOfTopTenKeywords(
            'http://www.naver.com'
        );
        console.log(result);
        assert.isArray(result);
        assert.lengthOf(result, 10);
    }).timeout(5000);
});