// Instância do Vue (coração da aplicação)
var app = new Vue({
  // relacionando com um elemento id=app
  el: '#app',
  data: {
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
      cart: 0
  },
  // metódos que podem ser chamados na view
  methods: {
    addToCart: function(){
      // this se refere ao valor dentro de data
      this.cart += 1
    },
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
    }
  }

});