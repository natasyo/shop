<template>
  <div class="logIn">
    <div class="container logIn__container">
      <div class="signUp__form form">
        <h2>Авторизация</h2>
        <div class="form__field">
          <label for="email" class="form__label">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            :class="{
              form__text: true,
              form__text_error: v$.email.$errors.length,
            }"
            placeholder="example@email.ru"
          />
          <div class="form__field_errors" v-if="v$.email.$errors.length">
            <p
              class="form__field_error"
              v-for="error in v$.email.$errors"
              :key="error.$vaidator"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="form__field">
          <label for="password" class="form__label">Пароль</label>
          <input
            type="password"
            id="password"
            :class="{
              form__text: true,
              form__text_error: v$.password.$errors.length,
            }"
            v-model="password"
            placeholder="пароль"
          />
          <div class="form__field_errors" v-if="v$.password.$errors.length">
            <p
              class="form__field_error"
              v-for="error in v$.password.$errors"
              :key="error.$vaidator"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="form__field">
          <button class="form__button" @click.prevent="login">Войти</button>
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
  data () {
    return {
      v$: useVuelidate(),
      email: '',
      password: ''
    }
  },
  validations () {
    return {
      email: {
        required: helpers.withMessage('Обязательное поле', required)
      },
      password: {
        required: helpers.withMessage('Обязательное поле', required)
      }
    }
  },
  methods: {
    login (e) {
      axios
        .post('/login', {
          email: this.email,
          password: this.password
        })
        .then((resp) => {
          if (resp.status === 200) this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang='scss'>
</style>
