export default {
  addToCart(state, user){
    state.cart.push(user.id)
  }
}