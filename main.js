// Instância do Vue (coração da aplicação)
var app = new Vue({
  // relacionando com um elemento id=app
  el: '#app',
  data: {
    product: 'Socks',
    description: 'Put in your feet',
    image: 'vmSocks-green.jpeg',
    inventory: '0'
  }
});