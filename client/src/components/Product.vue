<template>
  <div class="card" style="width: 15rem;">
    <img class="card-img-top" :src="product.image" alt="Product Image">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <div class="card-text">Rp. {{ product.price }}</div>
      <div class="card-text">Stock: {{ product.stock }}</div>
      <div class="card-text">Seller: {{ product.seller.name }}</div>
      <router-link v-if="!isUser" class="btn btn-primary mt-1" style="margin-right: 1px;" :to="`/product/${product._id}`">Detail</router-link>
      <button v-if="!isUser && isLogin && !isInCart(product._id)" @click.prevent="$emit('addToCart', product)" class="btn btn-primary mt-1 float-right">Buy</button>
      <button v-if="!isUser && isLogin && isInCart(product._id)" @click.prevent="$emit('removeProduct', product)" class="btn btn-danger mt-1 float-right">Cancel</button>
      <router-link v-if="isUser" class="btn btn-primary mt-1" style="margin-right: 1px;" :to="`/myproducts/${product._id}`">Detail</router-link>
      <router-link v-if="isUser" class="btn btn-primary mt-1" style="margin-right: 1px;" :to="`/myproducts/edit/${product._id}`">Edit</router-link>
      <button v-if="isUser" @click.prevent="deleteProduct(product._id)" class="btn btn-danger mt-1">Delete</button>
      <div v-if="isLoading" class="d-flex justify-content-center">
        <div class="spinner-border text-primary"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    deleteProduct(id) {
      this.isLoading = true;
      this.$axios
        .delete(`/products/${id}`, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          this.$emit('afterDelete');
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        })
    },
    isInCart(productId) {
      for(let i = 0; i < this.myCart.length; i++) {
        if(this.myCart[i]._id === productId) {
          return true;
        }
      }
      return false;
    },
  },
  props: ['product', 'isUser', 'myCart', 'isLogin'],
};
</script>

<style scoped>
  img {
    width: 100%;
    height: 100px;
  }
</style>
