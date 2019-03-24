<template>
  <div>
    <navbar @login="isLogin = !isLogin" :is-login="isLogin" :my-name="name" />
    <router-view @clearCart="cart = []" 
                 @clearSearch="searchProducts = []" 
                 @search="searchProducts = filter($event)" 
                 @removeProduct="removeFromCart($event)" 
                 @addToCart="cart.push($event)" 
                 @login="isLogin = !isLogin" 
                 @getProduct="getProducts" 
                 :is-login="isLogin" :my-name="name" 
                 :my-cart="cart" :products="products" 
                 :search-products="searchProducts" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
export default {
  components: {
    Navbar,
  },
  data() {
    return {
      isLogin: false,
      name: '',
      cart: [],
      products: [],
      searchProducts: [],
    }
  },
  created() {
    if(localStorage.access_token) {
      this.isLogin = true;
      this.name = localStorage.name
    }
    this.getProducts();
  },
  methods: {
    getProducts() {
      this.$axios
        .get('/products')
        .then(({ data }) => {
          data.forEach(product => {
            product.quantity = 1;
          })
          this.products = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeFromCart(product) {
      for(let i = 0; i < this.cart.length; i++) {
        if(this.cart[i]._id === product._id) {
          this.cart.splice(i, 1);
        }
      }
    },
    filter(search) {
      return this.products.filter(product => {
        return product.name.search(new RegExp(search, 'i')) > -1
      })
    }
  },
};
</script>
