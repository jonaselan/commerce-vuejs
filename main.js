// componentes só podem retornar um elemento
Vue.component('product', {
  // prop é um atributo especial que passa dados entre componentes
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
        <!-- v-bind:mouseover -->
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
      <product-review @submit-review="addReview"></product-review>
    </div>
  `,
  data(){
    // cada componente retorna um novo objeto data, e isso é importante poís 
    // dessa forma cada componente é maleavel a novos valores, e não 
    // compartilha os mesmos dados se for utilizados em diversos locais
    return {
      product: 'Mugs',
      brand: 'Mbrandgs',
      selectedVariant: 0,
      details: ["Pretty cool", "For coffee"],
      reviews: [],
      variants: [
        {
          id: 4,
          styleObject: {
            backgroundColor: "red",
            border: '1px solid green'
          },
          quantity: 5,
          image: "https://secure.img1-fg.wfcdn.com/im/31544274/resize-h800%5Ecompr-r85/7431/7431785/Java+Coffee+Mug.jpg"
        },
        {
          id: 5,
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
      // emitir um evento
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    // E6S sintax
    updateImage(index){
      this.selectedVariant = index
    },
    addReview(productReview){
      this.reviews.push(productReview)
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

Vue.component('product-review', {
  // v-model: two-way data binding (retorna dados do front para o componente)
  template: `
  <div>
    <!-- prevent: evita que o submit tenha seu comportamento normal (recarregar a página) -->
    <form class="review-form" @submit.prevent="onSubmit">
      <h1>Leave a review:</h1>
      <div class="field">
        <label for="name"> Name: </label>
        <input class="input" type="text" v-model="name">      
      </div>
      
      <div class="field">    
        <label for="name"> Review: </label>
        <textarea class="textarea" v-model="review"></textarea>
      </div>
      
      <div class="field">        
        <label for="name"> Rating: </label>
        <div class="select">
          <select v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </div>
      </div>
      
      <div class="control">
        <button class="button is-info">Submit</button>
      </div>
    </form>
  </div>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
    }
  },
  methods: {
      onSubmit() {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        }
        name = null
        review = null
        rating = null      
        this.$emit('submit-review', productReview)
      }
  }
})


// Instância do Vue (coração da aplicação)
var app = new Vue({
  // relacionando com um elemento id=app
  el: '#app',
  data: {
    cart: [],
  },
  methods: {
    updateCart(id){
      // this se refere ao valor dentro de data
      this.cart.push(id)
    }
  }

});