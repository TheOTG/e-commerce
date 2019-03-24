<template>
  <div class="container-fluid p-2" style="min-height: 650px;">
    <div class="row no-gutters justify-content-center align-items-center">
      <div class="product col-12 mb-2">
        <router-view :my-name="myName" />
      </div>
      <div class="col-3 mb-1" v-for="product in products" :key="product._id">
        <Product @afterDelete="getProducts" :product="product" :is-user="true" :is-login="isLogin" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Product from '@/components/Product.vue';

export default {
  name: 'MyProducts',
  components: {
    Product,
  },
  data() {
    return {
      products: []
    };
  },
  mounted() {
    if(this.isLogin) {
      this.getProducts();
    } else {
      this.$router.push('login');
    }
  },
  methods: {
    getProducts() {
      this.$axios
        .get('/products/myList', {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          this.products = data;
          this.$emit('getProduct');
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  props: ['isLogin', 'myName'],
};
</script>

<style scoped>
  .container-fluid {
    background-color: rgb(235, 221, 195);
    min-height: 500px;
  }
  .product {
    background-color: rgb(208, 224, 213);
    min-height: 200px;
  }
</style>
