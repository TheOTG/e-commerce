<template>
  <div class="container p-2 mt-5" style="min-height: 650px;">
    <div class="row justify-content-center">
      <div class="col-6">
        <form @submit.prevent="newProduct" enctype="multipart/form-data">
          <h3 class="text-center">Product Form</h3>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" placeholder="Name" v-model="name">
          </div>
          <div class="form-group">
            <label>Price</label>
            <input type="number" class="form-control" v-model="price">
          </div>
          <div class="form-group">
            <label>Stock</label>
            <input type="number" class="form-control" v-model="stock">
          </div>
          <div class="form-group">
            <label>Description</label>
            <br>
            <textarea class="form-control" placeholder="Description" v-model="description"></textarea>
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
// @ is an alias to /src

export default {
  name: 'Sell',
  data() {
    return {
      name: '',
      price: 0,
      description: '',
      imageFile: '',
      featuredImage: '',
      stock: 0,
      isLoading: false,
    }
  },
  mounted() {
    if(!this.isLogin) {
      this.$router.push('login');
    }
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
    newProduct() {
      this.isLoading = true;
      const formData = new FormData();
      const dataFile = document.querySelector('#file');
      if(dataFile.files[0]) {
        formData.append('file', dataFile.files[0]);
      }
      formData.append('name', this.name);
      formData.append('price', this.price);
      formData.append('description', this.description);
      formData.append('stock', this.stock);

      this.$axios
        .post('/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          this.$swal('Product registration success!', `Thank you for using our platform, ${this.myName}!`, 'success');
          this.$router.push('product');
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  props: ['isLogin', 'myName']
};
</script>
