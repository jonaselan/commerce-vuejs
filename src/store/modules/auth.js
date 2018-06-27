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
    status: '',
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
  actions: {
    [AUTH_REQUEST]: ({
      commit,
      dispatch
    }, user) => {
      // The Promise used for router redirect in login
      return new Promise((resolve, reject) => { 
        commit(AUTH_REQUEST)
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
            const token = resp.data.access_token
            localStorage.setItem('user-token', token)
            axios.defaults.headers.common['Authorization'] = token
            // you have your token, now log in your user :)
            commit(AUTH_SUCCESS, token)
            // dispatch(USER_REQUEST)
            resolve(resp)
          })
          .catch(err => {
            commit(AUTH_ERROR, err)
            // if the request fails, remove any possible user token if possible
            localStorage.removeItem('user-token')
            reject(err)
          })
      })
    },
    [AUTH_LOGOUT]: ({
      commit,
      dispatch
    }) => {
      // clear your user's token from localstorage
      return new Promise((resolve, reject) => {
        commit(AUTH_LOGOUT)
        localStorage.removeItem('user-token')
        // remove the axios default header
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  // basic mutations, showing loading, success, error to reflect the api call status and the token when loaded
  mutations: {
    [AUTH_REQUEST]: (state) => {
      state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
      state.status = 'success'
      state.token = token
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error'
    },
    [AUTH_LOGOUT]: (state) => {
      state.token = ''
    }
  }
}
