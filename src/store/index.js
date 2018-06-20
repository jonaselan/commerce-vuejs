import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'

Vue.use(Vuex)

// exportar para toda a aplicação
export const store = new Vuex.Store({
    // obrigatório em cada store
    state: {
        cart: [],
        products: [
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
        ]
    }
})