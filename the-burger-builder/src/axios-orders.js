import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-64bad-default-rtdb.firebaseio.com/'
});

export default instance;
