import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT
} from '../actions/auth';
import axios from 'axios';

export default {
  state: {
    token: localStorage.getItem('user-token') || '',
    expire_time: localStorage.getItem('user-token-time') || '',
    refresh_token: localStorage.getItem('user-refresh-token') || '',
    status: '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    [AUTH_REQUEST]: ({
      commit
    }, user) => {
      // The Promise used for router redirect in login
      return new Promise((resolve, reject) => { 
        commit(AUTH_REQUEST);
        axios({
            method: 'post',
            baseURL: 'http://laravelproject.test',
            url: '/api/login',
            data: user,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(resp => {
            const token = resp.data.access_token;
            axios.defaults.headers.common['Authorization'] = token;

            localStorage.setItem('user-token', token);
            localStorage.setItem('user-refresh-token', resp.data.refresh_token);
            localStorage.setItem('user-token-time', resp.data.expires_in);
            
            // you have your token :)
            commit(AUTH_SUCCESS, resp);

            resolve(resp);
          })
          .catch(err => {
            // if the request fails, remove any possible user token if possible
            localStorage.removeItem('user-token');

            commit(AUTH_ERROR, err);
            reject(err);
          });
      });
    },
    [AUTH_LOGOUT]: ({
      commit
    }) => {
      // clear your user's token from localstorage
      return new Promise((resolve) => {
        commit(AUTH_LOGOUT);
        localStorage.removeItem('user-token');
        // remove the axios default header
        delete axios.defaults.headers.common['Authorization'];
        resolve();
      });
    }
  },
  // basic mutations, showing loading, success, error to reflect the api call status and the token when loaded
  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading';
    },
    [AUTH_SUCCESS]: (state, resp) => {
      state.status = 'success';

      state.token = resp.data.access_token;
      state.refresh_token = resp.data.refresh_token;
      state.expire_time = resp.data.expires_in;
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error';
    },
    [AUTH_LOGOUT]: (state) => {
      state.token = '';
    }
  }
};
