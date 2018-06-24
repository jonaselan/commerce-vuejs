export default {
  pushProductToCart(state, product){
    state.cart.push({
      product: product.id,
      price: product.price,
      quantity: 1
    })
  },
  incrementItemQuantity(state, cartItem){
    cartItem.quantity++
  },
  decrementProductInventory(state, product){
    product.quantity--
  },
  fillProducts(state, products){
    state.productsApi.push(products.fields.products) 
  }
}