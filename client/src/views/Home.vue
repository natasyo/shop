<template>
  <div class="home">
    <banner :currentItem="0">
      <banner-item>
        <img src="../assets/images/banner2.jpg" alt="" />
      </banner-item>
      <banner-item>
        <img src="../assets/images/banner1.jpg" alt="" />
      </banner-item>
      <banner-item>
        <img src="../assets/images/banner2.jpg" alt="" />
      </banner-item>
      <banner-item>
        <img src="../assets/images/banner1.jpg" alt="" />
      </banner-item>
    </banner>
    <div class="home__products">
      <div class="container home__container">
        <h2>Featured Products</h2>
        <products class="home__products-container"></products>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '../components/BannerComponent.vue'
import BannerItem from '@/components/BannerItemComponent'
import Products from '@/components/ProductsComponent'
export default {
  components: {
    Banner,
    BannerItem,
    Products
  },
  mounted () {
    // console.log('-----------------', this.$route.params.currentCurrency)
  }
}
</script>
<style lang="scss">
.home {
  width: 100%;
  &__products-container{
    max-width: calc(75% - 28px);
    justify-content: space-between;
  }
}
</style>
