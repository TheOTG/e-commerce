<template>
  <form @submit.prevent="login" class="dropdown-menu p-4" style="width: 270px; left: 50%; right: auto; transform: translate(-50%, 0)">
    <div class="form-group">
      <label>Email address</label>
      <input type="email" class="form-control" placeholder="E-mail" v-model="email">
    </div>
    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" placeholder="Password" v-model="password">
    </div>
    <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
  </form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
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
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  form::before {
    position: absolute;
    width: 12px;
    height: 12px;
    border-top: 1px solid rgba(0,0,0,.15);
    border-left: 1px solid rgba(0,0,0,.15);
    left: 50%;
    bottom: 100%;
    margin-bottom: -6px;
    margin-left: -6px;
    content: '';
    background-color: #ffffff;
    transform: rotate(45deg);
  }
</style>
