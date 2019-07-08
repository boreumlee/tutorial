const {
    getTopTen,
    getSearchPageHTML,
    getRelatedKeyword,
    getRelatedKeywordsOfTopTenKeywords,
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

    describe('getSearchPageHTML', () => {
        it('google페이지 html string', async () => {
            const result = await getSearchPageHTML('http://www.google.com');
            assert.isString(result);
        }).timeout(5000);
    });

    describe('getRelatedKeyword', () => {
        it('김주하 연관검색어', async () => {
            const html = await getSearchPageHTML(
                'https://search.naver.com/search.naver?where=nexearch&query=%EA%B9%80%EC%A3%BC%ED%95%98&sm=top_lve&ie=utf8',
            );
            const result = getRelatedKeyword(html);
            console.log(result);
            assert.isArray(result);
            assert.lengthOf(result, 10);
        }).timeout(5000);

        it('`위메프 푸드 두번할인` 연관검색어 없음', async () => {
            const html = await getSearchPageHTML(
                'https://search.naver.com/search.naver?where=nexearch&query=%EC%9C%84%EB%A9%94%ED%94%84+%ED%91%B8%EB%93%9C+%EB%91%90%EB%B2%88%ED%95%A0%EC%9D%B8&sm=top_lve&ie=utf8',
            );
            const result = getRelatedKeyword(html);
            console.log(result);
            assert.isArray(result);
            assert.lengthOf(result, 0);
        }).timeout(5000);
    });
});

describe('naver 순위 연관검색어 리스트', () => {
    it('연관검색어 list', async () => {
        const result = await getRelatedKeywordsOfTopTenKeywords(
            'http://www.naver.com',
        );
        console.log(result);
        assert.isArray(result);
        assert.lengthOf(result, 10);
    }).timeout(5000);
});
