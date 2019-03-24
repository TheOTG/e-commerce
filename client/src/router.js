import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "productlist" */ './views/ProductList.vue'),
      props: true,
    },
    {
      path: '/product',
      name: 'product-list',
      component: () => import(/* webpackChunkName: "productlist" */ './views/ProductList.vue'),
      props: true,
      children: [
        {
          path: ':id',
          name: 'product-detail',
          component: () => import(/* webpackChunkName: "productdetail" */ './views/ProductDetail.vue'),
          props: true,
        },
        {
          path: '*',
          name: 'product-not-found',
          component: () => import(/* webpackChunkName: "productlist" */ './views/ProductList.vue'),
          props: true,
        },
      ]
    },
    {
      path: '/myproducts',
      name: 'my-products',
      component: () => import(/* webpackChunkName: "myproducts" */ './views/MyProducts.vue'),
      props: true,
      children: [
        {
          path: ':id',
          name: 'my-product-detail',
          component: () => import(/* webpackChunkName: "productdetail" */ './views/ProductDetail.vue'),
          props: true,
        },
        {
          path: 'edit/:id',
          name: 'product-edit',
          component: () => import(/* webpackChunkName: "productedit" */ './views/ProductEdit.vue'),
          props: true,
        },
        {
          path: '*',
          name: 'my-product-not-found',
          component: () => import(/* webpackChunkName: "productlist" */ './views/MyProducts.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/sell',
      name: 'sell',
      component: () => import(/* webpackChunkName: "sell" */ './views/Sell.vue'),
      props: true,
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
      props: true,
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import(/* webpackChunkName: "cart" */ './views/Cart.vue'),
      props: true,
    },
  ],
});
