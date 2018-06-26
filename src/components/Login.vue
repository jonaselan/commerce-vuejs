<template>
 <div>
   <form class="login" @submit.prevent="login">
     <h1>Sign in</h1>
     <label>Email:</label>
     <input required v-model="email" type="text" />
     <label>Password: </label>
     <input required v-model="password" type="password" />
     <button type="submit">Login</button>
   </form>
 </div>
</template>

<script>
import { AUTH_REQUEST } from "../store/actions/auth";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function() {
      const { email, password } = this;
      // Vuex actions returning promises
      this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
