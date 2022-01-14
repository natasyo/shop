<template>
  <div class="banner" @resize="resizeBanner">
    <div
      class="banner__container"
      :style="{ 'margin-left': '-' + 100 * current + '%' }"
    >
      <slot></slot>
    </div>
    <div class="banner__dots">
      <button
        class="banner__dots-item"
        v-for="i in countItem"
        :key="i"
        ref="dot"
        @click="goTo(i)"
      >
        {{ i }}
      </button>
    </div>
    <button @click="prevItem" class="banner__btn banner__btn-prev" :disabled="current<=0">
      <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-left" class="svg-inline--fa fa-chevron-left fa-w-10" role="img" viewBox="0 0 320 512"><path fill="currentColor" d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg>
    </button>
    <button @click="nextItem" class="banner__btn banner__btn-next" :disabled="current>=countItem-1">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" class="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    currentItem: Number
  },
  data () {
    return {
      current: this.currentItem,
      countItem: 0,
      prevDot: 0
    }
  },
  methods: {
    nextItem () {
      this.width = this.$el.clientWidth
      if (this.current < this.countItem - 1) {
        this.current += 1
      }
      this.$store.commit('increment')
    },
    prevItem () {
      this.width = this.$el.clientWidth
      if (this.current > 0) {
        this.current--
      }
    },
    goTo (i) {
      this.current = i - 1
    },
    resizeBanner () {
      this.width = this.$el.clientWidth
    }
  },
  watch: {
    current (value) {
      this.$refs.dot[this.prevDot].classList.remove('banner__dots-item_current')
      this.prevDot = value
      this.$refs.dot[value].classList.add('banner__dots-item_current')
    }
  },
  created () {
    window.addEventListener('resize', this.resizeBanner)
  },
  unmounted () {
    window.removeEventListener('resize', this.resizeBanner)
  },
  mounted () {
    setTimeout(() => {
      this.$refs.dot[this.current].classList.add('banner__dots-item_current')
      this.width = this.$el.clientWidth
    }, 0)
  }
}
</script>
<style lang="scss">
.banner {
  overflow: hidden;
  position: relative;
  text-align: center;
  &__container {
    display: flex;
    transition: all 0.5s ease;
  }
  &__dots{
    position: absolute;
    bottom: 50px;
    width: 100%;
    text-align: center;
  }
  &__dots-item{
    font-size: 0;
    height: 10px;
    width: 10px;
    border: 0;
    padding: 0;
    background: $color-gray;
    border-radius: 50%;
    margin: 0 5px;
    transition: ease all 0.5s;
  }
  &__dots-item_current{
    background: $color-blue;
    height: 12px;
    width: 12px;
    transition: ease all 0.5s;
  }
  &__btn{
    position: absolute;
    top: 50%;
    width: 50px;
    color: $color-gray;
    border: 0;
    background: transparent;
    &:disabled{
      opacity: 0.2;
    }
  }
  &__btn-prev{
    left: 20px;
  }
  &__btn-next{
    right: 20px;
  }
}
</style>
