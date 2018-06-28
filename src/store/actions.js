import { ApiProducts } from '../utils/api';

export default {
    addProductToCart({commit, state}, product) {
      if (product.quantity > 0) {
        const cartItem = state.cart.find(item => item.id === product.id);
        if(!cartItem){
          commit('pushProductToCart', product);
        }
        else {
          commit('incrementItemQuantity', cartItem);
        }

        commit('decrementProductInventory', product);
      } 
    },
    fetchProducts({commit}) {
      ApiProducts().then((prods) => {
        commit('fillProducts', prods);
      });
    }
};