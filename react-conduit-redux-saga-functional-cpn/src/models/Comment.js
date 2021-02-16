import axios from 'axios';

import { ENTRYPOINT } from '../constants/URL';
import { headersGenerator } from '../utils/RequestHeaderUtil';

export default class Comment {
  async getComments(token, slug) {
    try {
      const res = await axios.get(`${ENTRYPOINT}/articles/${slug}/comments`, {
        headers: headersGenerator(token)
      });
      return res.data;
    } catch(e) {
      return e.response.data;
    }
  }

  async addComment(token, slug, body) {
    try {
      const res = await axios.post(`${ENTRYPOINT}/articles/${slug}/comments`, {
        "comment": {
          "body": body
        }
      }, {
        headers: headersGenerator(token)
      });
      return res.data
    } catch(e) {
      return e.response.data;
    }
  }

  async deleteComment(token, slug, id) {
    try {
      const res = axios({
        method: 'DELETE',
        url: `${ENTRYPOINT}/articles/${slug}/comments/${id}`,
        headers: headersGenerator(token)
      });
      return res.data;
    } catch(e) {
      return e.response.data;
    }
  }
}
