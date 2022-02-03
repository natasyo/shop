<template>
  <div class="shop">
    <div class="shop__container">
      <ShopPanelComponent />
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import ShopPanelComponent from '../../components/admin/ShopPanelComponent.vue'
export default {
  components: {
    ShopPanelComponent
  },
  mounted () {
    console.log(this.$route.path.split('/'))
  }
}
</script>
<style lang="scss">
.shop {
  min-height: 100%;
  height: 100%;
  &__container {
    min-height: 100%;
    height: 100%;
    display: flex;
  }
}
</style>
