import axios from 'axios';

const BASE_URL = 'http://laravelproject.test';

export {
  ApiProducts
};

function ApiProducts() {
  return axios({
      method: 'get',
      baseURL: BASE_URL,
      url: '/api/v1/products',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data);
}
