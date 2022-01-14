<template>
<div class="banner__item"  :style="{'min-width':widthItem+'px', 'width':widthItem+'px'}">
        <slot></slot>
    </div>
</template>
<script>
export default {
  // props: {
  //   width: Number
  // },
  data () {
    return {
      w: this.$parent.width
    }
  },
  methods: {
    resizeBanner () {
      this.w = this.$parent.width
      console.log(this.w)
    }

  },
  mounted () {
    this.$parent.countItem++
    setTimeout(() => {
      this.w = this.$parent.width
    }, 1)
  },
  created () {
    window.addEventListener('resize', this.resizeBanner)
  },
  unmounted () {
    window.removeEventListener('resize', this.resizeBanner)
  },
  computed: {
    widthItem (el) {
      return this.w
    }
  }
}
</script>
<style lang="scss">
.banner__item{
  box-sizing: border-box;
  height: 477px;
  overflow: hidden;
  text-align: center;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
