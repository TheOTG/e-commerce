<template>
  <div class="container-fluid p-2" style="min-height: 650px;">
    <div class="row no-gutters justify-content-center align-items-center">
      <div class="product col-12 mb-2">
        <router-view />
      </div>
      <div class="col-3 mb-1" v-for="product in products" :key="product._id">
        <Product @removeProduct="$emit('removeProduct', $event)" @addToCart="$emit('addToCart', $event)" :product="product" :is-user="false" :my-cart="myCart" :is-login="isLogin" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from '@/components/Product.vue';

export default {
  name: 'ProductList',
  components: {
    Product,
  },
  props: ['isLogin', 'myName', 'myCart', 'products'],
};
</script>

<style scoped>
  .container-fluid {
    background-color: rgb(235, 221, 195);
    min-height: 500px;
  }
  .product {
    background-color: rgb(208, 224, 213);
  }
</style>
