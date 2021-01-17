import axios from 'axios';

//sending token from local storage with every user request
const authContext = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export default authContext;
