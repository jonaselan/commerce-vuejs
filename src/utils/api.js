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
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('user-token')
      }
    })
    .then(response => response.data);
}
