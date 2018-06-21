export default {
    addToCart({ commit }, user) {
      // simular requisição assicrona
      setTimeout(() => {
        commit('addToCart', user)  
      }, 1000)
      
    }
}