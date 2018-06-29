<template>
 <div>
   <div v-if="loading"> 
     <Loading />
   </div>
   <div v-else>
    <form class="login" @submit.prevent="login">
        <h1>Sign in</h1>
        <label>Email:</label>
        <input required v-model="email" type="text" />
        <label>Password: </label>
        <input required v-model="password" type="password" />
        <button type="submit">Login</button>
    </form>
   </div>
   
 </div>
</template>

<script>
import { AUTH_REQUEST } from "../store/actions/auth";
import { mapGetters } from "vuex";
import Loading from "@/components/Loading";

export default {
  name: "login",
  data() {
    return {
      email: "email@email.com",
      password: "123123"
    };
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus"]),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    }
  },
  methods: {
    login: function() {
      const { email, password } = this;
      // Vuex actions retorna promises
      this.$store.dispatch(AUTH_REQUEST, { email, password }).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
