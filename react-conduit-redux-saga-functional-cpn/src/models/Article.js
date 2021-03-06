import axios from 'axios';

import { ENTRYPOINT } from '../constants/URL';
import { headersGenerator } from '../utils/RequestHeaderUtil';

const itemsPerPage = 10;

export default class Article {
  async getArticle(token, slug) {
    try {
      const res = await axios.get(
        `${ENTRYPOINT}/articles/${slug}`,
        {
          headers: headersGenerator(token)
        }
      );
      return res.data;
    } catch(e) {
      return e.response.data;
    }
  }

  async getArticles(token, tag = '', author = '', favorited = '', page) {
    try {
      const res = await axios.get(
        `${ENTRYPOINT}/articles`,
        {
          headers: headersGenerator(token),
          params: {
            tag,
            author,
            favorited,
            limit: itemsPerPage,
            offset: (page - 1) * itemsPerPage
          }
        });
      return res.data;
    } catch(e) {
      return e;
    }
  }

  async getFeedArticles(token, page) {
    try {
      const res = await axios.get(
        `${ENTRYPOINT}/articles/feed`,
        {
          headers: headersGenerator(token),
          params: {
            limit: itemsPerPage,
            offset: (page - 1) * itemsPerPage
          }
        });
      return res.data;
    } catch(e) {
      return e;
    }
  }

  async newArticle(token, title, description, body, tagList) {
    try {
      const res = await axios.post(`${ENTRYPOINT}/articles`, {
        "article" : {
          "title": title,
          "description": description,
          "body": body,
          "tagList": tagList
        }
      }, {
        headers: headersGenerator(token)
      });
      return res.data;
    } catch(e) {
      return e.response.data;
    }
  }
  async updateArticle(token, slug, title, description, body, tagList) {
    try {
      const res = await axios.put(`${ENTRYPOINT}/articles/${slug}`, {
        "article": {
          "title": title,
          "description": description,
          "body": body,
          "tagList": tagList
        }
      }, {
        headers: headersGenerator(token)
      });
      return res.data;
    } catch(e) {
      return e.response.data;
    }
  }

  async toggleFavoritedArticle(token, articleSlug, type) {
    try {
      const res = await axios({
        method: `${type === 'like' ? 'POST' : 'DELETE'}`,
        url: `${ENTRYPOINT}/articles/${articleSlug}/favorite`,
        headers: headersGenerator(token)
      })
      return res.data.article;
    } catch (err) {
      console.log("Something went wrong when trying to favorite this article");
    }
  }

  async deleteArticle(token, slug) {
    try {
      const res = axios({
        method: 'DELETE',
        url: `${ENTRYPOINT}/articles/${slug}`,
        headers: headersGenerator(token)
      });
      return res.data;
    } catch(e) {
      return e.response.data;
    }
  }
}
