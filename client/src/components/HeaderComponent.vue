<template>
  <div class="header">
      <div class="header__top">
          <div class="container header__container">
              <div class="header__top-left">
                  <drop-down-component
                  title="Language:" :items="languages"
                  :currentItem="currentLanguage"
                  @changeCurrentItem="chengeCurrent"/>
                  <drop-down-component
                  title="Currency:" :items="currencies"
                  :currentItem="currCurrency"
                  @changeCurrentItem="chengeCurrent"/>
              </div>
              <div class="header__top-nav">
                <router-link to="/account">Account</router-link>
                <router-link to="/wishlist">Wishlist</router-link>
                <router-link to="/checkout">Checkout</router-link>
                <router-link to="/login">Log In</router-link>
                <router-link to="/signup">Sign Up</router-link>
              </div>
        </div>
      </div>
    <div class="header__main">
      <div class="container header__main-container">
        <router-link class="logo header__logo" to="/">LEO Shop</router-link>
        <div class="header__nav">
          <router-link class="header__nav-link" to="/">Home  </router-link>
          <a class="header__nav-link" href="/">women</a>
          <a class="header__nav-link" href="/">men</a>
          <a class="header__nav-link" href="/">other</a>
          <a class="header__nav-link" href="/">purchase</a>
        </div>
        <div class="header__right">
          <SearchComponent class="header__search"/>
          <a href="/" class="header__icon">
            <img src="../assets/images/pay.png" alt="">
          </a>
          <a href="/" class="header__icon">
            <img src="../assets/images/basket.png" alt="">
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
  props: {

  },
  computed: {
    currencies () {
      const currObj = {}
      const currensyItems = this.$store.state.currencies.items
      for (const item in currensyItems) {
        currObj[item] = item.toUpperCase()
        console.log(currObj)
      }
      return currObj
    },
    currCurrency () {
      return this.$store.state.currencies.current
    }
  },
  mounted () {

  },
  methods: {
    chengeCurrent (data) {
      this.$store.commit('changeCurrentCurrency', data.current)
      console.log(this.$store.state)
      this[data.name] = data.current
      this.$emit('changeSettings', {
        data
      })
    }
  }
}
</script>

<style>

</style>
