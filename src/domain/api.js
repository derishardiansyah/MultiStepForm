import axios from 'axios';
import { merge } from 'lodash';

const urls = {
  countryList: 'https://restcountries.com/v3.1/all',
  shortUrl: 'https://api.shrtco.de/v2/shorten',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };
  const headers = merge(defaultHeader, header);

  const options = {
    url: endpoint,
    method,
    headers,
    data,
    params,
  };

  return axios(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const getCountryList = () => callAPI(urls.countryList, 'get');

export const getShortUrl = (url) => callAPI(urls.shortUrl, 'post', {}, { url });
