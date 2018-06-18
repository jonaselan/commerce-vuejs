// Instância do Vue (coração da aplicação)
var app = new Vue({
  // relacionando com um elemento id=app
  el: '#app',
  data: {
    product: 'Mugs',
    image: 'https://secure.img1-fg.wfcdn.com/im/31544274/resize-h800%5Ecompr-r85/7431/7431785/Java+Coffee+Mug.jpg',
    inventory: '20',
    inStock: false,
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
          quantity: 3,
          image: "https://shop.pbs.org/ccstore/v1/images/?source=/file/v6723789822436512814/products/CSTM501.gif&height=100&width=100"
        }
      ],
      cart: 0
  },
  methods: {
    addToCart: function(){
      // this se refere ao valor dentro de data
      this.cart += 1
    },
    updateImage(image){
      this.image = image
    }
  }
});