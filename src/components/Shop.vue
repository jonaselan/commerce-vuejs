<template>
  <div v-if="isAuthenticated">
    <ShopCart/>
    <div class="product">
      <div v-for="product in products" :key="product.id">
        <div class="product-image">
          <!-- v-bind:src -->
          <!-- cria uma relação entre o atributo e a propriedade -->
          <img :src="product.image">
        </div>
        <div class="product-info">
          <h4> <span class="thick">Title:</span> {{ product.title }}</h4>
          <p> <span class="thick">Price:</span> {{ product.price }} </p>
          <p> <span class="thick">Quantity:</span> {{ product.quantity }} </p>
        </div>
        
        <button type="button" 
                :disabled="!productIsInStock(product)" 
                :class="{ disabledButton: !productIsInStock(product) }"
                @click="addToCart(product)"> Add to Cart </button>
      </div>
    </div>
  </div>
</template>

<script>
import ShopCart from "@/components/ShopCart";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    ShopCart
  },
  computed: {
    ...mapGetters({
      products: "getShopProducts",
      productIsInStock: "productIsInStock",
      isAuthenticated: "isAuthenticated"
    })
  },
  methods: {
    ...mapActions({
      addToCart: "addProductToCart" // this.$store.dispatch('addProductToCart', product)
    })
  }
};
</script>
