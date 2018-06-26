<template>
    <div class="cart">
        <p>Cart ({{ cart.length }})</p>
        <p> 
        {{ totalCart }} 
        </p>          
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      cart: "getCart",
      totalCart: "totalCart"
    })
  }
};
</script>
