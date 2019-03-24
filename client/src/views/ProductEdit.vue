<template>
  <div class="container mt-5" style="min-height: 650px;">
    <div class="row justify-content-center">
      <div class="col-6">
        <form @submit.prevent="editProduct" enctype="multipart/form-data">
          <h3 class="text-center">Product Form</h3>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="product.name">
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="number" class="form-control" v-model="product.price">
          </div>
          <div class="form-group">
            <label>Stock</label>
            <input type="number" class="form-control" v-model="product.stock">
          </div>
          <div class="form-group">
            <label>Description</label>
            <br>
            <textarea class="form-control" placeholder="Description" v-model="product.description"></textarea>
          </div>
          <div class="mb-3">
            <input id="file"  type="file" accept="image/*" @change="previewImage">
            <br>
            <img class="mt-1" style="width: 100px; height: 100px;" v-if="featuredImage" :src="featuredImage">
          </div>
          <button v-if="!isLoading" type="submit" class="btn btn-primary w-100">Sell Your Product!</button>
          <div v-if="isLoading" class="d-flex justify-content-center">
            <div class="spinner-border text-primary"></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      product: '',
      imageFile: '',
      featuredImage: '',
      isLoading: false
    };
  },
  mounted() {
    this.$axios
      .get(`/products/${this.$route.params.id}`)
      .then(({ data }) => {
        this.product = data;
        this.featuredImage = data.image;
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
        this.featuredImage = data.image;
      })
      .catch(err => {
        console.log(err);
      })
    next();
  },
  methods: {
    previewImage(e) {
      this.imageFile = e.target.files[0]
      if(this.imageFile) {
          this.featuredImage = URL.createObjectURL(this.imageFile)
      } else {
          this.featuredImage = null
      }
    },
    editProduct() {
      this.isLoading = true;
      const formData = new FormData();
      const dataFile = document.querySelector('#file');
      if(dataFile.files[0]) {
        formData.append('file', dataFile.files[0]);
      }
      formData.append('name', this.product.name);
      formData.append('price', this.product.price);
      formData.append('description', this.product.description);
      formData.append('stock', this.product.stock);

      this.$axios
        .put(`/products/${this.product._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          this.$swal('Product edited!', `Thank you for using our platform, ${this.myName}!`, 'success');
          this.$router.push('/myproducts');
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
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
