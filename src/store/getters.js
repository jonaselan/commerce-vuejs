export default {
    getProducts(state) {
      return state.products
    },
    getCart(state){
      return state.cart
    },
    // getProductStock: (state, product) => {
    //   const prod = state.products.find(item => item.id === product.id)
    //   return prod.quantity
    // },
    // getTodoById: (state) => (product) => {
    //   const prod = state.products.find(item => item.id === product.id)
    //   return prod.quantity
    // }
}