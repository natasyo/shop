<template>
  <div class="admin-cat">
    <div class="container admin-cat__container">
      <h1>Категории</h1>
      <div class="admin-cat__categories">
        <div
          class="admin-cat__category"
          v-for="category in categories"
          :key="category._id"
        >
          {{ category.name }}
          <button class="admin-cat__remove">
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
      </div>
      <div class="admin-cat__add-form form">
        <ModalComponent @closeModal="closeModal" :isShowProps="isShowForm">
          <template v-slot:header>
            <h3>Добавление категории</h3>
          </template>
          <div class="admin-cat__form">
            <div class="form__field">
              <label for="category-name" class="form__label"
                >Название категории</label
              >
              <input
                type="text"
                v-model="categoryName"
                id="category-name"
                :class="{
                  form__text: true,
                  form__text_error: v$.categoryName.$errors.length
                }"
                placeholder="Обувь"
              />
              <p
                class="form__field_error"
                v-for="error in v$.categoryName.$errors"
                :key="error.$vaidator"
              >
                {{ error.$message }}
              </p>
            </div>
            <div class="form__field">
              <label for="category-parent" class="form__label"
                >Родительская категория</label
              >
              <FindDropComponent
                :items="categories"
                @selectItem="selectCategory"
              />
            </div>
            <div class="form__field"></div>
            <p class="errors" v-if="errorServer.length">
              {{ errorServer }}
            </p>
            <div class="form__field">
              <button class="form__button" @click.prevent="addCategory">
                Добавить категорию
              </button>
            </div>
          </div>
        </ModalComponent>
        <div class="form__field">
          <button class="form__button" @click.prevent="addCategory">
            Добавить категорию
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import axios from 'axios'
import ModalComponent from '../../components/ModalComponent.vue'
import FindDropComponent from './FindDropComponent.vue'
export default {
  data () {
    return {
      v$: useValidate(),
      categoryName: '',
      isShowForm: false,
      errorServer: '',
      categories: [],
      currentItem: ''
    }
  },
  validations () {
    return {
      categoryName: {
        required: helpers.withMessage('Обязательное поле', required)
      }
    }
  },
  methods: {
    selectCategory (data) {
      this.currentItem = data.current
    },
    addCategory () {
      if (!this.isShowForm) {
        axios
          .post('/admin/get-categories', {
            name: this.categoryName
          })
          .then((resp) => {
            this.categories = resp.data.categories
            console.log(this.categories)
          })
          .catch((err) => {
            console.log(err)
          })
        return (this.isShowForm = true)
      }
      this.v$.$validate()
      if (this.v$.$errors.length === 0) {
        axios
          .post('admin/add-category', {
            name: this.categoryName,
            parent: this.currentItem._id
          })
          .then((resp) => {
            console.log(resp.status)
            if (resp.status === 400) {
              return (this.errorServer = resp.response.data.message)
            }
            this.categoryName = null
            this.isShowForm = false
            this.currentItem = ''
          })
          .catch((error) => {
            console.log(localStorage.getItem('token'))
            console.log('--------------', error)
            this.currentItem = ''
          })
        console.log('ok')
      }
    },
    getChildrenCategories (data) {
      console.log(data)
    },
    closeModal () {
      this.isShowForm = false
    }
  },
  components: { ModalComponent, FindDropComponent }
}
</script>
<style lang="scss">
.admin-cat {
  flex-grow: 1;
  & form__field {
    width: 100%;
  }
  &__categories {
    margin: 50px 0;
  }
  &__category {
    padding: 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 400px;
    margin: 0 auto;
    &:hover {
      background: $color-green;
      color: $color-white;
      cursor: pointer;
    }
  }
  &__remove {
    padding: 0;
    border: 0;
    background: transparent;
    svg {
      width: 10px;
      color: $color-error;
    }
  }
}
</style>
