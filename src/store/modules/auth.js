import {
  AUTH_REQUEST,
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REFRESH
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
    isAuthenticated: state => !!state.token, // existe o token no state? (bool)
    authStatus: state => state.status,
  },
  actions: {
    [AUTH_REQUEST]: ({
      commit
    }, user) => {
      // A Promise usada para redirecionar para o login
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
            // quando recupera o token, coloca como default nas próximas requisições
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            // salvar os dados no local storage
            localStorage.setItem('user-token', token);
            localStorage.setItem('user-refresh-token', resp.data.refresh_token);
            localStorage.setItem('user-token-time', resp.data.expires_in);
            
            // salvar no state :)
            commit(AUTH_SUCCESS, resp);

            resolve(resp);
          })
          .catch(err => {
            // se ser erro, remover o token
            localStorage.removeItem('user-token');

            commit(AUTH_ERROR, err);
            reject(err);
          });
      });
    },
    [AUTH_REFRESH]: ({
      commit
    }) => {
      return new Promise((resolve, reject) => { 
        commit(AUTH_REQUEST);
        axios({
            method: 'post',
            baseURL: 'http://laravelproject.test',
            url: '/api/login/refresh',
            data: {
              refreshToken: localStorage.getItem('user-refresh-token')
            },
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
          .then(resp => {
            const token = resp.data.access_token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

            localStorage.setItem('user-token', token);
            localStorage.setItem('user-refresh-token', resp.data.refresh_token);
            localStorage.setItem('user-token-time', resp.data.expires_in);
            
            commit(AUTH_SUCCESS, resp);

            resolve(resp);
          })
          .catch(err => {
            commit(AUTH_ERROR, err);
            reject(err);
          });
      });
    },
    [AUTH_LOGOUT]: ({
      commit
    }) => {
      // remover token do localstorage e do servidor
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST);
        axios({
          method: 'post',
          baseURL: 'http://laravelproject.test',
          url: '/api/logout',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          commit(AUTH_LOGOUT);
          localStorage.removeItem('user-token');
          // remover header padrãdo do axios
          delete axios.defaults.headers.common['Authorization'];
          resolve();
        })
        .catch(err => {
          commit(AUTH_ERROR, err);
          reject(err);
        });
        
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
      state.status = 'exit';

      state.token = '';
      state.refresh_token = '';
      state.expire_time = '';
    }
  }
};
