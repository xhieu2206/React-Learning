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

  async update(token, username, bio, email, password, image) {
    try {
      const res = await axios.put(`${ENTRYPOINT}/user`, {
        "user": {
          "username": username,
          "bio": bio,
          "email": email,
          "password": password,
          "image": image
        }
      }, {
        headers: headersGenerator(token)
      });
      return res.data;
    } catch(e) {
      return e.response.data;
    }
  }
}
