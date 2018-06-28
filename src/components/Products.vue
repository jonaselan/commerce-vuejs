<template>
  <div v-if="isAuthenticated">
    <h3 class="text-center">Produtos</h3>
    <hr/>

    <div class="col-sm-4" v-for="prod in getProducts" :key="prod._id">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"> {{ prod }} </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  beforeMount() {
    this.$store.dispatch('fetchProducts')
  },
  computed: {
    ...mapGetters({
      isAuthenticated: "isAuthenticated"
    }),
    getProducts(){
      return this.$store.getters.getProducts;
    }
  }
};
</script>
