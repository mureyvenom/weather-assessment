import axios from 'axios';

export default axios.create({
  //   baseURL: 'https://api.openweathermap.org/data/3.0/onecall',
  baseURL: 'https://api.openweathermap.org/data/2.5/',
  params: {
    appid: '92ef4acb2a97f9f19656bf6d87d72121',
    exclude: 'minutely,daily,alerts',
    units: 'metric',
  },
});
