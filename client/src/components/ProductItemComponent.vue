<template>
    <div class="product">
        <div class="product__image">
            <img :src="require ('../assets/images/'+productData.image)" alt="productData.title">
        </div>
        <div class="product__info">
            <div class="product__info-left">
                <p class="product__name">{{productData.title}}</p>
                <p class="product__prices">
                    <span class="product__price-old" v-if="productData.oldPrice">
                        {{currencyDesignation}}{{oldPrice}}
                    </span>
                    <span class="product__price-current">
                        {{currencyDesignation}}{{price}}
                    </span>
                </p>
            </div>
            <div class="product__basket-wrap">
                <button class="product__in-basket">
                    <img src="../assets/images/inBasket.png" alt="">
                </button>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      currencies: null
    }
  },
  props: {
    productData: Object
  },
  async mounted () {
    await axios.get('http://localhost:3000/currenciesConverter').then(response => {
      this.currencies = response.data
    })
  },
  computed: {
    price (value) {
      let price = 0
      if (this.productData.currency === this.currency) {
        price = this.productData.price
      } else {
        if (this.currencies) {
          price = this.currencies[this.productData.currency][this.currency] * this.productData.price
        }
      }
      return Math.ceil((price) * 100) / 100
    },
    oldPrice (value) {
      let price = 0
      if (this.productData.currency === this.currency) {
        price = this.productData.oldPrice
      } else {
        if (this.currencies) {
          price = this.currencies[this.productData.currency][this.currency] * this.productData.oldPrice
        }
      }
      console.log(price)
      return Math.ceil((price) * 100) / 100
    },
    ...mapState({
      currency: state => state.currencies.current,
      currencyDesignation: state => state.currencies.items[state.currencies.current].designation
    })
  }
}
</script>
<style lang="scss">
.product{
    padding: 8px;
    box-sizing: border-box;
    box-shadow: 0px 0px 8px #eaeaea;
    width: calc((100% - 56px) / 3);
    height: 320px;
    margin-bottom: 25px;
    position: relative;
    &__image{
        background: $color-product-img;
        display: flex;
        align-items: center;
        height: 230px;
        img{
            max-width: 100%;
        }
    }
    &__name{
        margin-top: 5px;
        font-size: 14px;
        line-height: 22px;
    }
    &__prices{
        text-align: left;
    }
    &__price-old{
        font-size: 14px;
        text-decoration: line-through;
        margin-right: 5px;
    }
    &__price-current{
        font-size: 18px;
        line-height: 22px;
        color: $color-green;
    }
    &__in-basket{
        height: 47px;
        width: 47px;
        background: $color-green;
        border-radius: 50%;
        border:0;
    }
    &__info{
        display:flex;
        justify-content: space-between;
        margin-top: 10px;
    }
}
</style>
