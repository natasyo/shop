<template>
    <div class="products">
        <product-item
        class="products__item"
        v-for="product in products"
        :key="product.id"
        :productData="product"
        />
    </div>
</template>
<script>
import axios from 'axios'
import ProductItem from '@/components/ProductItemComponent'
export default {
  components: {
    ProductItem
  },
  data () {
    return {
      products: null
    }
  },
  mounted () {
    axios.get('http://localhost:3000/products')
      .then(response => (this.products = response.data))
  }

}
</script>
<style lang="scss">
.products{
    display: flex;
    flex-wrap: wrap;
}
</style>
