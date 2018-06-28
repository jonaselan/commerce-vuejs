<template>
  <div class="container">
    <div class="nav-bar"> 
      <ul>
        <li><router-link to="/"> Home </router-link></li>
        <li><router-link to="/shopping"> Shop </router-link></li>
        <li><router-link to="/products"> Products </router-link></li>
        <li><router-link to="/login"> Login </router-link></li>
        <li><a @click='logout'>Logout</a></li>
      </ul>
    </div>
  
    <div id="app">  
      <router-view/>
    </div>
  </div>
</template>

<script>
import { AUTH_LOGOUT, AUTH_REFRESH } from "./store/actions/auth";
import axios from "axios";

export default {
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT).then(() => {
        this.$router.push("/login");
      });
    },
    refresh() {
      this.$store.dispatch(AUTH_REFRESH).then(() => {
        next();
      });
    }
  },
  created() {
    var self = this;
    axios.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.request.status === 401) {
          // if you ever get an unauthorized, get a new token
          self.refresh();
        }
        throw err;
      });
    });
  }
};
</script>

<style>
body {
  font-family: tahoma;
  color: #282828;
  margin: 0px;
}

.nav-bar {
  background: linear-gradient(-90deg, #84cf6a, #16c0b0);
  height: 60px;
  margin-bottom: 15px;
}

.product {
  display: flex;
  flex-flow: wrap;
  padding: 1rem;
}

.product-image {
  width: 80%;
}

.product-image,
.product-info {
  margin-top: 10px;
  width: 50%;
}

.color-box {
  width: 40px;
  height: 40px;
  margin-top: 5px;
}

.cart {
  margin-right: 25px;
  float: right;
  border: 1px solid #d8d8d8;
  padding: 5px 20px;
}

button {
  margin-top: 30px;
  border: none;
  background-color: #1e95ea;
  color: white;
  height: 40px;
  width: 100px;
  font-size: 14px;
}

.disabledButton {
  background-color: #d8d8d8;
}

img {
  border: 1px solid #d8d8d8;
  width: 70%;
  margin: 40px;
  box-shadow: 0px 0.5px 1px #d8d8d8;
}

input {
  width: 100%;
  height: 25px;
  margin-bottom: 20px;
}

.thick {
  font-weight: bold;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
  background-color: #111;
}
</style>
