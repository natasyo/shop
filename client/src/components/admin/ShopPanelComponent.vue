<template>
  <div class="shop-panel">
    <router-link to="/admin">Главная</router-link>
    <router-link to="/admin/categories">Категории</router-link>
    <router-link to="/admin/products">Товары</router-link>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.shop-panel {
  background: $color-green;
  color: $color-white;
  height: 100%;
  width: 25%;
  min-width: 200px;
  border-bottom: 5px solid $color-white;
  box-sizing: border-box;
  a{
    display: flex;
    height: 50px;
    align-items: center;
    padding: $pading;
    box-sizing: border-box;
    text-decoration: none;
    color: $color-white;
    text-decoration: none;
    border-bottom: 1px solid $color-white;
    &.router-link-exact-active{
      background: $color-blue;
    }
  }
}
</style>
