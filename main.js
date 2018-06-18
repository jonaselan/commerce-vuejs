Vue.component('product', {
  props: {
    premium:{
        type: Boolean,
        required: true
    }
  },
  template: `
    <div class="product">
      
      <div class="product-image">
        <!-- v-bind:src -->
        <!-- cria uma relação entre o atributo e a propriedade -->
        <img :src="image">
      </div>
      
      <div class="product-info">
        <!-- {{ EXPRESSION }} -->
        <h1> {{ title }} </h1>
        
        <p v-if="inStock > 10"> In stock ({{ inStock }}) </p>
        <p v-else-if="inStock > 0 && inStock <= 10"> Almost sold out ({{ inStock }})</p>
        <p v-else> Out of stock </p>
        <p> Shipping: {{ shipping }} </p> 
        <!-- detalhes -->
        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>
        
        <!-- variedades -->
        <!-- style coloca estilo -->
        <div v-for="(variant, index) in variants" 
            :key="variant.id"
            class="color-box"
            :style="variant.styleObject" 
            @mouseover="updateImage(index)">
            <!-- <p> {{ variant.quantity }} </p> -->
        </div>
        
        <!-- v-on:click -->
        <button type="button" 
                :disabled="!inStock" 
                :class="{ disabledButton: !inStock }"
                @click="addToCart"> Add to Cart </button>
      </div>
    </div>
  `,
  data(){
    return {
      product: 'Mugs',
      brand: 'Mbrandgs',
      selectedVariant: 0,
      details: ["Pretty cool", "For coffee"],
      variants: [
        {
          id: 234,
          styleObject: {
            backgroundColor: "red",
            border: '1px solid green'
          },
          quantity: 5,
          image: "https://secure.img1-fg.wfcdn.com/im/31544274/resize-h800%5Ecompr-r85/7431/7431785/Java+Coffee+Mug.jpg"
        },
        {
          id: 235,
          styleObject: {
            backgroundColor: "black",
            border: '1px solid green'
          },
          quantity: 0,
          image: "https://shop.pbs.org/ccstore/v1/images/?source=/file/v6723789822436512814/products/CSTM501.gif&height=100&width=100"
        }
      ],
    }
  },
  // metódos que podem ser chamados na view
  methods: {
    // função anonima
    addToCart: function(){
      this.$emit('add-to-cart')
    },
    // sintax E6S 
    updateImage(index){
      this.selectedVariant = index
    }
  },
  // os resultados são armazenados no cache até o momento de sua alteração
  computed: {
        title(){
          return this.brand + ' ' + this.product
        },
        image(){
          return this.variants[this.selectedVariant].image
        },
        inStock(){
          return this.variants[this.selectedVariant].quantity
        },
        shipping(){
          if (this.premium) return 'free'
          return 2.99
        }
      }
})

// Instância do Vue (coração da aplicação)
var app = new Vue({
  // relacionando com um elemento id=app
  el: '#app',
  data: {
    cart: 0,
  },
  methods: {
    updateCart(){
      // this se refere ao valor dentro de data
      this.cart += 1
    }
  }

});