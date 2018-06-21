export default {
    addProductToCart(context, product) {
      if (product.quantity > 0) {
        const cartItem = context.state.cart.find(item => item.id === product.id)
        if(!cartItem){
          context.commit('pushProductToCart', product)
        }
        else {
          context.commit('incrementItemQuantity', cartItem)
        }

        context.commit('decrementProductInventory', product)
      } 
    }
}