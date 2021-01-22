import axios from 'axios';

import { ENTRYPOINT } from '../constants/URL';
import { headersGenerator } from '../utils/RequestHeaderUtil';

export default class Tag {
  async getTags() {
    try {
      const res = await axios({
        method: 'GET',
        url: `${ENTRYPOINT}/tags`,
        headers: headersGenerator()
      });
      return res.data;
    } catch (err) {
      return err;
    }
  }
}
