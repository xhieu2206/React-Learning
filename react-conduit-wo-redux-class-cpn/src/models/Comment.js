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
}
