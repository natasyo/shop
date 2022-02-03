import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Wishlist from '../views/Wishlist.vue'
import Account from '../views/Account.vue'
import Checkout from '../views/Checkout.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import axios from 'axios'
import Admin from '../views/admin/Admin.vue'
import ProductsVue from '../views/admin/Products.vue'
import Categories from '../views/admin/Categories.vue'
import HomeAdmin from '../views/admin/Home.vue'

const isAuth = (from, to, next) => {
  axios
    .post('/checkUser', {
      token: localStorage.getItem('token')
    })
    .then((resp) => {
      console.log(resp.status)
      const user = resp.data.isAuth
      if (user) {
        next()
        return false
      } else {
        router.push('login')
      }
    })
    .catch((err) => {
      console.log('err', err.request)
      router.push('login')
    })
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/wishlist',
    name: 'Wishlist',
    component: Wishlist,
    beforeEnter: isAuth
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout
  },
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      { path: '', component: HomeAdmin },
      { path: 'categories', component: Categories },
      { path: 'products', component: ProductsVue }
    ],
    beforeEnter: [
      isAuth,
      (from, to, next) => {
        if (localStorage.getItem('role') === 'admin') next()
      }
    ]
  },

  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
