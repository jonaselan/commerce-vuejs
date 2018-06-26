export default {
  getShopProducts(state) {
    return state.products
  },
  getCart(state) {
    return state.cart
  },
  productIsInStock() {
    // retornar uma função que recebe o produto como argumento
    return (product) => {
      return product.quantity > 0
    }
  },
  totalCart(state) {
    return state.cart.reduce(function (prevVal, elem) {
      return Math.round((prevVal + elem.price) * 100) / 100;
    }, 0)
  },
  getProducts(state) {
    return state.productsApi
  }
}
