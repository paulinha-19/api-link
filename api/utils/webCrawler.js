const cheerio = require('cheerio');
const axios = require("axios");

const fetchData = async (url) => {
    try {
        const result = await axios.get(url);
        return result.data
    }
    catch (error) {
        console.error(error);
    }
}

const webCrawler = async (url) => {
    const content = await fetchData(url);
    const $ = cheerio.load(content);
    let articleWithoutHttps = [];
    let articleWithHttps = [];
    let emptyArticles = [];
    $('div.blog-featured-container > div.blog-article-card').each((index, el) => {
        const title = $(el).find('.blog-article-card-title > a').text();
        const url = "https://devgo.com.br" + $(el).find('a.blog-article-card-cover').attr("href");
        const data = { title, url }
        articleWithoutHttps.push(data);
    })
    $('div.blog-articles-container > div.blog-article-card').each((index, el) => {
        const title = $(el).find('.blog-article-card-title > a').text();
        const url = $(el).find('a.blog-article-card-cover').attr("href");
        const data = { title, url }
        articleWithHttps.push(data);
    })
    const allArticles = [...emptyArticles, ...articleWithoutHttps, ...articleWithHttps];
    return allArticles;
}
module.exports = { fetchData, webCrawler }