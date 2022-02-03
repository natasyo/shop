<template>
  <div class="find-drop">
    <p class="find-drop__input" @click="showItems">
      <span v-if="!current" class="find-drop__placeholder"
        >Выберите категорию</span
      >
      <span v-if="current" class="find-drop__current">
        {{ current.name }}
      </span>
      <svg
        aria-hidden="true"
        focusable="false"
        data-prefix="fas"
        data-icon="angle-down"
        class="svg-inline--fa fa-angle-down fa-w-10"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 320 512"
      >
        <path
          fill="currentColor"
          d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
        ></path>
      </svg>
    </p>
    <ul class="find-drop__items" v-if="isShowItems">
      <li class="find-drop__item" v-for="item in items" :key="item._id">
        <span @click="getChildrens(item)">{{ item.name }}</span>
        <button class="find-drop__item-btn" @click="selectItem(item)">
          Выбрать
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    items: Object,
    currentItem: Object
  },
  data () {
    return {
      current: '',
      isShowItems: false
    }
  },
  methods: {
    showItems () {
      this.isShowItems = !this.isShowItems
      this.current = ''
    },
    closeItems () {
      this.isShowItems = false
    },
    selectItem (key) {
      this.current = key
      this.isShowItems = false
      this.$emit('selectItem', {
        current: this.current
      })
    },
    getChildrens (item) {
      console.log('item', item)
      this.$emit('getChildrens', { item })
    }
  }
}
</script>
<style lang="scss">
.find-drop {
  position: relative;
  &__placeholder {
    color: $color-gray;
  }
  &__input {
    border: 1px solid #c6c6c6;
    height: 29px;
    width: 100%;
    padding: 0 8px;
    border-radius: 0;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: $input-fsz;
    justify-content: space-between;
    svg {
      height: 15px;
      transform: rotate(270deg);
      color: $color-gray;
    }
  }
  &__items {
    position: absolute;
    width: 100%;
    background: #fff;
    box-shadow: 0 0 2px rgba(0, 0, 0, 21%);
    padding: $pading 0;
    box-sizing: border-box;
    overflow: auto;
    max-height: 147px;
  }
  &__item {
    font-size: $input-fsz;
    color: $color-gray;
    padding: 3px $pading;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:hover {
      cursor: pointer;
      background: $color-green;
      color: $color-white;
      .find-drop__item-btn {
        color: $color-white;
      }
    }
  }
  &__current {
    flex-grow: 1;
  }
  &__item-btn {
    border: $color-white 1px solid;
    font-size: $input-fsz;
    color: $color-green;
    background: transparent;
    &:hover {
      color: $color-white;
      cursor: pointer;
    }
  }
}
</style>
