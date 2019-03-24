<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-4">
        <form @submit.prevent="login">
          <h3 class="text-center">E-Commerce</h3>
          <div class="form-group">
            <label>Email address</label>
            <input type="email" class="form-control" placeholder="E-mail" v-model="email">
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" placeholder="Password" v-model="password">
          </div>
          <button v-if="!isLoading" type="submit" class="btn btn-primary w-100">Login</button>
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
  name: 'Register',
  data() {
    return {
      email: '',
      password: '',
      isLoading: false,
    };
  },
  mounted() {
    if(this.isLogin) {
      this.$router.push('product');
    }
  },
  methods: {
    login() {
      this.isLoading = true;
      this.$axios
        .post('/user/login', {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          const { access_token, name } = data
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('name', name);
          this.$emit('login', name);
          this.$router.push('product');
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
