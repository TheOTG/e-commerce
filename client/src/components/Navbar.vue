<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light p-1 border-bottom border-success">
    <router-link class="navbar-brand mr-4" to="/">E-commerce</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav align-items-center">
        <li class="hov nav-item rounded active">
          <router-link class="nav-link" to="/product">Buy</router-link>
        </li>
        <li class="hov nav-item rounded active">
          <router-link class="nav-link" to="/sell">Sell</router-link>
        </li>
        <li class="hov nav-item rounded active">
          <router-link class="nav-link" to="/myproducts">My Products</router-link>
        </li>
      </ul>
      <form @submit.prevent="searchProduct()" class="ml-3 mr-3" style="display: inline-block; width: 50%;">
        <input id="search" class="form-control" type="search" placeholder="Search" v-model="search">
      </form>
      <router-link class="hov noDecor rounded nav-link" to="/cart"><i class="fas fa-shopping-cart"></i> Cart</router-link>
      <div v-if="!isLogin" class="dropdown">
        <a href="#" class="hov noDecor rounded nav-link" data-toggle="dropdown">Login</a>
        <Login @login="$emit('login')" />
      </div>
      <router-link v-if="!isLogin" class="hov noDecor rounded nav-link" to="/register">Register</router-link>
      <div v-if="isLogin" class="nav-item ml-2 mr-2">Hello, {{ myName }}!</div>
      <button v-if="isLogin" @click.prevent="logout" class="btn btn-danger ml-1 mr-1">Sign Out</button>
    </div>
  </nav>
</template>

<script>
import Login from '@/components/Login.vue'
export default {
  name: 'Navbar',
  components: {
    Login
  },
  data() {
    return {
      search: '',
    }
  },
  methods: {
    logout() {
      this.$emit('login', '');
      localStorage.clear();
    },
    searchProduct() {
      this.$router.push(`/product?search=${this.search}`);
    }
  },
  props: ['isLogin', 'myName'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hov:hover {
    background-color: rgb(105, 202, 102);
    transition: 0.4s;
  }

  .collapse {
    text-align: center;
  }

  .nav-link {
    padding-left: 8px;
    padding-right: 8px;
  }

  #search {
    width: 100%;
    background-image: url('../assets/search.png');
    background-position: 6px 8px;
    background-repeat: no-repeat;
    background-size: 20px;
    padding-left: 35px;
  }

  .noDecor {
    text-decoration: none;
    color: rgb(78, 76, 76);
  }
</style>
