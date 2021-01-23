import React from 'react';

const authContext = React.createContext({
  isLoggedIn: false,
  token: '',
  username: '',
  image: '',
  bio: '',
  id: null,
  email: '',
  login: () => {},
  setInformation: () => {}
});

export default authContext;
