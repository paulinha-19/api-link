import * as cheerio from 'cheerio';
import axios from "axios";

const fetchData = async (url) => {
    try {
        const result = await axios.get(url);
        return result.data
    }
    catch (error) {
        console.log(error);
    }
}


(async () => {
    const content = await fetchData("https://devgo.com.br/");
    const $ = cheerio.load(content);
    let articles = [];
    $('div.blog-featured-container > div.blog-article-card').each((index, el) => {
        const title = $(el).find('.blog-article-card-title > a').text();
        const link = "https://devgo.com.br" +  $(el).find('a.blog-article-card-cover').attr("href");
        const data = { title, link }
        articles.push(data);
    })
    console.log("BLOG FEATURED \n\n", articles);
})();

(async () => {
    const content = await fetchData("https://devgo.com.br/");
    const $ = cheerio.load(content);
    let articles = [];
    $('div.blog-articles-container > div.blog-article-card').each((index, el) => {
        const title = $(el).find('.blog-article-card-title > a').text();
        const link =  $(el).find('a.blog-article-card-cover').attr("href");
        const data = { title, link }
        articles.push(data);
    })
    console.log("BLOG ARTICLES", articles);
})();

export default fetchData