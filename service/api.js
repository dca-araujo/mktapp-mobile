import axios from 'react-native-axios';

const api = axios.create({
  // baseURL: process.env.REACT_APP_API_URL
  baseURL: 'https://mktapp-backend.herokuapp.com/'
})

export default api;