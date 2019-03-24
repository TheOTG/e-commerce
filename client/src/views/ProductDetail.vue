<template>
  <div>
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <img class="mr-2 mt-2" :src="product.image">
      </div>
      <div class="d-flex flex-column">
        <div class="">
          <h3>{{ product.name }}</h3>
        </div>
        <div class="">
          Price: Rp. {{ product.price }}
        </div>
        <div class="">
          Stock: {{ product.stock }}
        </div>
        <div class="" v-if="product.seller">
          Seller: {{ product.seller.name }}
        </div>
      </div>
    </div>
    <div class="w-50 text-center ml-auto mr-auto">
      <h3>Description</h3>
      {{ product.description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: '',
    };
  },
  mounted() {
    this.$axios
      .get(`/products/${this.$route.params.id}`)
      .then(({ data }) => {
        this.product = data;
      })
      .catch(err => {
        console.log(err);
      })
  },
  beforeRouteUpdate(to, from, next) {
    this.$axios
      .get(`/products/${to.params.id}`)
      .then(({ data }) => {
        this.product = data;
      })
      .catch(err => {
        console.log(err);
      })
    next();
  },
  props: ['isLogin', 'myName'],
};
</script>

<style scoped>
  img {
    width: 200px;
    height: 150px;
  }
</style>
