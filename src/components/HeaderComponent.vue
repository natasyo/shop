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
                  :currentItem="currentCurrency"
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
            <SearchComponent/>
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
      currencies: {
        usd: 'USD',
        byn: 'BYN'
      },
      currentCurrency: 'usd',
      currentLanguage: 'ru'
    }
  },
  methods: {
    chengeCurrent (data) {
      this[data.name] = data.current
    }
  }
}
</script>

<style>

</style>
