import axios from 'axios';

import { ENTRYPOINT } from '../constants/URL';
import { headersGenerator } from '../utils/RequestHeaderUtil';

export default class User {
  signIn(email, password) {
    return axios.post(`${ENTRYPOINT}/users/login`, {
      "user": {
        "email": email,
        "password": password
      }
    }, {
      headers: headersGenerator()
    });
  }

  signUp(username, email, password) {
    return axios.post(`${ENTRYPOINT}/users`, {
      "user": {
        "username": username,
        "email": email,
        "password": password
      }
    }, {
      headers: headersGenerator()
    });
  }
}
