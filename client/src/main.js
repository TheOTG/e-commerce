import Vue from 'vue';
import VueSwal from 'vue-swal';
import axios from 'axios';
import App from './App.vue';
import router from './router';

Vue.use(VueSwal);

axios.defaults.baseURL = 'http://e-commerce-server.kennyanthonythe.xyz';

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
