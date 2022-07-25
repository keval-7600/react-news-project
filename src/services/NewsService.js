import http from '../HttpCommon';

const newsUrl = `https://newsapi.org/v2/top-headlines?apiKey=${process.env.REACT_APP_API_KEY}`;

function getNews(page, pageSize, country='in', category = '') {
    return http.get(newsUrl + `&country=${country ? country?.toLowerCase() : ''}&category=${category ? category?.toLowerCase() : ''}&page=${page}&pageSize=${pageSize}`);
  }

const NewsService = {
    getNews
}

export default NewsService;
