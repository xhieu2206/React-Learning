import axios from 'axios';

import { ENTRYPOINT } from '../constants/URLs';

class Authentication {
  async signUp(username, email, password) {
    try {
      const res = await axios.post(`${ENTRYPOINT}/api/Authenticate/register`, {
        username: username,
        email: email,
        password: password
      }, {
        headers: {
          "Accept": "*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin" : "*"
        }
      });
      console.log(res);
      return res;
    } catch(err) {
      console.log(err.response)
      return err.response;
    }
  }
}

export default Authentication;
