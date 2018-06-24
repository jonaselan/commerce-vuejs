<template>
  <div>
    
    <h3 class="text-center">Produtos</h3>
    <hr/>

    <div class="col-sm-4" v-for="prod in getProducts" :key="prod._id">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"> {{ prod.name }} </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  beforeMount() {
    this.$store.dispatch('fetchProducts')
  },
  methods: {

  },
  computed: {
    getProducts(){
      return this.$store.getters.getProducts
    }
  }
};
</script>
