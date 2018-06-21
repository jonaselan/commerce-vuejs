export default {
  pushProductToCart(state, product){
    state.cart.push({
      id: product.id,
      quantity: 1
    })
  },
  incrementItemQuantity(state, cartItem){
    cartItem.quantity++
  },
  decrementProductInventory(state, product){
    product.quantity--
  }
}