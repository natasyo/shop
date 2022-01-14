<template>
    <div class="drop-down" @click="visible=!visible">
      <p class="drop-down__current">
          <span class="drop-down__title">{{title}} </span> {{items[current]}}
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-down" class="svg-inline--fa fa-angle-down fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"></path></svg>
      </p>
      <transition name="fade">
      <div class="drop-down__items" v-if="visible">
          <p class="drop-down__item" v-for="(item, key) in items" :key="key" @click="changeLanguage(key)">{{item}}</p>
      </div>
      </transition>

    </div>
</template>
<script>
export default {
  name: 'DropDown',
  props: {
    items: Object,
    currentItem: String,
    title: String
  },
  data () {
    return {
      visible: false,
      current: this.currentItem
    }
  },
  watch: {
    currentItem (newVal) {
      this.current = newVal
    }
  },
  methods: {
    changeLanguage: function (key) {
      this.$emit('changeCurrentItem', {
        current: key,
        name: 'current' + this.title.replace(':', '')
      })
    }
  }

}
</script>
<style lang="scss">

.drop-down{
  font-family: $font-family;
  font-size: 13px;
  color:#fff;
  position: relative;
  cursor: pointer;
  margin-right: 15px;
    &__current{
    svg{
      width: 9px;
      margin-left: 15px;
    }
    display: flex;
    align-items: center;
  }
  &__item{
    margin-bottom: 7px;
    &:hover{
      text-decoration: underline;
    }
  }
  &__items{
    position: absolute;
    top: 150%;
    padding: 5px 24px;
    right: 0;
    background: #4cb1ca;
    border-radius: 0 0 5px 5px;
  }
  &__title{
    color:#bef2ff;
    margin-right: 5px;
  }
}

</style>
