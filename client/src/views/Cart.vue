<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-9">
        <div class="d-flex flex-column">
          <div class="product mt-1 p-1" v-for="(product, index) in myCart" :key="index">
            <div class="d-flex flex-row justify-content-between align-items-center mb-2">
              <img :src="product.image" alt="Product Image">
              <div class="d-flex flex-column w-50">
                <h4>{{ product.name }}</h4>
                <div>Price: {{ product.price }}</div>
                <div>Stock: {{ product.stock }}</div>
                <div v-if="product.seller">Seller: {{ product.seller.name }}</div>
              </div>
              <div class="d-flex flex-row justify-content-end align-items-center float-right">
                <a href="#" @click.prevent="product.quantity = 1 ? 1 : product.quantity--" style="text-decoration: none; color: black;"><i class="mr-2 far fa-minus-square"></i></a>
                {{ product.quantity }}
                <a href="#" @click.prevent="product.quantity++" style="text-decoration: none; color: black;"><i class="ml-2 far fa-plus-square"></i></a>
                <div class="ml-3">
                  <button @click.prevent="$emit('removeProduct', product)" class="btn btn-danger mr-3 float-right"><i class="fas fa-times"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="myCart.length > 0" class="row justify-content-center">
      <button @click.prevent="checkout" class="btn btn-primary mt-2">Checkout</button>
    </div>
    <div v-else class="row justify-content-center ml-auto mr-auto mt-4 align-items-center" style="height: 200px; width: 80%; background-color: white;">
      <h2>No product has been added to the cart yet.</h2>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Cart',
  mounted() {
    if(!this.isLogin) {
      this.$router.push('login');
    }
  },
  methods: {
    checkout() {
      for(let i = 0; i < this.myCart.length; i++) {
        let product = {
          productId: this.myCart[i]._id,
          quantity: this.myCart[i].quantity,
        }
        this.myCart[i] = product;
      }
      this.$axios
        .post('/cart', {
          products: this.myCart
        }, {
          headers: {
            access_token: localStorage.access_token
          }
        })
        .then(({ data }) => {
          this.$swal('Transaction added', `Thank you for using our platform, ${this.myName}!`, 'success');
          this.$emit('clearCart');
        })
        .catch(err => {
          console.log(err);
        })
    },
  },
  props: ['isLogin', 'myName', 'myCart'],
};
</script>

<style scoped>
  .container-fluid {
    background-color: rgb(223, 189, 126);
    min-height: 500px;
  }

  .product {
    background-color: white;
  }

  img {
    width: 150px;
    height: 100px;
  }
</style>
