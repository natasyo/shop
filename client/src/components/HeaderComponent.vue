<template>
  <div class="header">
    <div class="header__top">
      <div class="container header__container">
        <div class="header__top-left">
          <drop-down-component
            title="Language:"
            :items="languages"
            :currentItem="currentLanguage"
            @changeCurrentItem="chengeCurrent"
          />
          <drop-down-component
            title="Currency:"
            :items="currencies"
            :currentItem="currCurrency"
            @changeCurrentItem="chengeCurrent"
          />
        </div>
        <div class="header__top-nav">
          <router-link to="/account">Account</router-link>
          <router-link to="/wishlist">Wishlist</router-link>
          <router-link to="/admin" v-if="isAdmin && isAuth">Shop</router-link>
          <router-link v-if="!isAuth" to="/login">Log In</router-link>
          <router-link v-if="!isAuth" to="/signup">Sign Up</router-link>
          <a href="/" @click.prevent="logout" v-if="isAuth">Logout</a>
        </div>
      </div>
    </div>
    <div class="header__main">
      <div class="container header__main-container">
        <router-link class="logo header__logo" to="/">LEO Shop</router-link>
        <div class="header__nav">
          <router-link class="header__nav-link" to="/">Home </router-link>
          <a class="header__nav-link" href="/">women</a>
          <a class="header__nav-link" href="/">men</a>
          <a class="header__nav-link" href="/">other</a>
          <a class="header__nav-link" href="/">purchase</a>
        </div>
        <div class="header__right">
          <SearchComponent class="header__search" />
          <a href="/" class="header__icon">
            <img src="../assets/images/pay.png" alt="" />
          </a>
          <a href="/" class="header__icon">
            <img src="../assets/images/basket.png" alt="" />
          </a>
          <a href="/" class="header__cart">Cart (0)</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropDownComponent from './DropDownComponent.vue'
import SearchComponent from '@/components/SearchComponent'

export default {
  name: 'Header',
  components: {
    DropDownComponent,
    SearchComponent
  },
  data () {
    return {
      languages: {
        ru: 'Русский',
        en: 'English'
      },
      currentLanguage: 'ru'
    }
  },
  props: {},
  computed: {
    currencies () {
      const currObj = {}
      const currensyItems = this.$store.state.currencies.items
      for (const item in currensyItems) {
        currObj[item] = item.toUpperCase()
      }
      return currObj
    },
    currCurrency () {
      return this.$store.state.currencies.current
    },
    isAuth () {
      console.log(localStorage.getItem('token'))
      return !!this.$store.state.creditinals.token
    },
    isAdmin () {
      if (this.$store.state.creditinals.role === 'admin') return true
      return false
    }
  },

  methods: {
    chengeCurrent (data) {
      this.$store.commit('changeCurrentCurrency', data.current)
      this[data.name] = data.current
      this.$emit('changeSettings', {
        data
      })
    },
    logout () {
      this.$store.commit('removeUser')
      // this.$router.go()
    }
  }
}
</script>

<style></style>
