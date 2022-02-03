<template>
  <div class="account">
    <div class="container account__container">
      <div class="signUp__form form">
        <div class="form__field">
          <label for="name" class="form__label">Ваше имя</label>
          <input
            type="text"
            id="name"
            v-model="name"
            :class="{
              form__text: true,
              form__text_error: v$.name.$errors.length
            }"
            placeholder="Иван"
          />
          <div class="form__field_errors" v-if="v$.name.$errors.length">
            <p
              class="form__field_error"
              v-for="error in v$.name.$errors"
              :key="error.$vaidator"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="form__field">
          <label for="last-name" class="form__label">Ваша фамилия</label>
          <input
            type="text"
            id="last-name"
            v-model="lastName"
            :class="{
              form__text: true,
              form__text_error: v$.lastName.$errors.length
            }"
            placeholder="Иванов"
          />
          <div class="form__field_errors" v-if="v$.lastName.$errors.length">
            <p
              class="form__field_error"
              v-for="error in v$.lastName.$errors"
              :key="error.$vaidator"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="form__field">
          <label for="address" class="form__label">Адресс</label>
          <input
            type="address"
            id="last-name"
            v-model="address"
            :class="{
              form__text: true,
              form__text_error: v$.address.$errors.length
            }"
            placeholder="г. Москва, ул. Ленина, 22"
          />
          <div class="form__field_errors" v-if="v$.address.$errors.length">
            <p
              class="form__field_error"
              v-for="error in v$.address.$errors"
              :key="error.$vaidator"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="form__field">
          <button class="form__button" @click.prevent="saveUser">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import axios from 'axios'
export default {
  data: function () {
    return {
      v$: useVuelidate(),
      name: '',
      lastName: '',
      address: ''
    }
  },
  validations () {
    return {
      name: {
        required: helpers.withMessage('Обязательное поле', required)
      },
      lastName: {
        required: helpers.withMessage('Обязательное поле', required)
      },
      address: {
        required: helpers.withMessage('Обязательное поле', required)
      }
    }
  },
  methods: {
    saveUser (e) {
      axios
        .post('/save-user-info', {
          name: this.name,
          lastName: this.lastName,
          address: this.address
        })
        .then((resp) => {})
        .catch((error) => {
          console.log(error.body)
        })
      console.log(this.$cookies.get('user'))
    }
  }
}
</script>
<style lang=""></style>
