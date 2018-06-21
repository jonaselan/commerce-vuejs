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
        {{ product.quantity }}
        <!-- :disabled="!inStock(product)" 
                :class="{ disabledButton: !inStock(product) }" -->
        <button type="button" 
                @click="addToCart(product)"> Add to Cart </button>
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
      addToCart(product){
        // chamar diretamente a mutations
        // this.$store.commit('addToCart', product)
        
        // usando actions
        this.$store.dispatch('addProductToCart', product)
      },
    }
  }
</script>
