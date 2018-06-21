<template>
  <div>
    <div class="cart">
      <p>Cart ({{ cart.length }})</p>          
    </div>
    <div class="product">
      <div v-for="product in products" :key="product.id">
        <div class="product-image">
          <!-- v-bind:src -->
          <!-- cria uma relação entre o atributo e a propriedade -->
          <img :src="product.image">
        </div>
        <div class="product-info">
          <h4> {{ product.title }}</h4>
          <p> {{ product.price }} </p>
        </div>
        
        <!--:disabled="!inStock" 
        :class="{ disabledButton: !inStock }"-->
        <button type="button" 
        @click="addProductCart(product)"> Add to Cart </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      products: 'getProducts',
      cart: 'getCart'
    })
  },
  methods: {
    addProductCart(product){
      this.$store.commit('addToCart', product)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
