<template>
  <Header
    :currentCurrencyProp="currentCurrency"
    :currenciesArray="currencyData"
    @changeSettings="onChangeSettings"
  />
  <div class="content">
    <router-view />
  </div>

  <Footer />
</template>
<script>
// import axios from 'axios'
import Header from './components/HeaderComponent.vue'
import Footer from './components/FooterComponent.vue'
export default {
  data: function () {
    return {
      currentCurrency: 'usd',
      currencyData: [
        {
          id: 'usd',
          designation: '$'
        }
      ]
    }
  },
  components: {
    Header,
    Footer
  },
  mounted () {
  },
  methods: {
    onChangeSettings (value) {
      this[value.data.name] = value.data.current
      // this.$router.reload()
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: $font-family;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
