<template>
  <div class="modal" @click.self="close" v-if="isShow">
    <div class="modal__content">
      <div class="modal__header">
        <slot name="header"></slot>
        <button class="modal__close" @click="close">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="times"
            class="svg-inline--fa fa-times fa-w-11"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 352 512"
          >
            <path
              fill="currentColor"
              d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
            ></path>
          </svg>
        </button>
      </div>
      <div class="modal__body">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    isShowProps: { Boolean, default: false }
  },
  data () {
    return {
      isShow: this.isShowProps
    }
  },
  methods: {
    close () {
      this.isShow = false
      this.$emit('closeModal')
    }
  },
  watch: {
    isShowProps (val) {
      this.isShow = val
    }
  }
}
</script>
<style lang="scss">
.modal {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba($color: #054652, $alpha: 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  &__content {
    width: 300px;
    min-height: 300px;
    background: $color-white;
    position: relative;
    padding: $pading*2;
  }
  &__header{
    padding:10px 0 15px;
  }
  &__close {
    width: 20px;
    height: 20px;
    background: transparent;
    padding: 0;
    border: 0;
    position: absolute;
    top: 0px;
    right: 0px;
    svg {
      width: 100%;
      height: 100%;
      color: $color-green;
    }
  }
}
</style>
