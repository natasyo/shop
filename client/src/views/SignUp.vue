<template>
  <div class="signUp">
    <div class="container signUp__container">
      <div class="signUp__form form">
        <h2>Регистрация</h2>
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
          <label for="passwordRepeat" class="form__label"
            >Повторите пароль</label
          >
          <input
            type="password"
            id="passwordRepeat"
            :class="{
              form__text: true,
              form__text_error: v$.confirmPassword.$errors.length,
            }"
            placeholder="пароль"
            v-model="confirmPassword"
          />
          <div
            class="form__field_errors"
            v-if="v$.confirmPassword.$errors.length"
          >
            <p
              class="form__field_error"
              v-for="error in v$.confirmPassword.$errors"
              :key="error.$vaidator"
            >
              {{ error.$message }}
            </p>
          </div>
        </div>
        <div class="form__field">
          <button class="form__button" @click="register">
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import {
  required,
  email,
  minLength,
  sameAs,
  helpers
} from '@vuelidate/validators'
export default {
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: '',
    confirmPassword: '',
    userExist: ''
  }),
  validations () {
    return {
      email: {
        required,
        email,
        isUnique: helpers.withMessage(
          'Данный email зарегистрирован',
          async (email) => {
            if (email === '') return true
            await axios
              .post('/getEmail', {
                email
              })
              .then((resp) => {
                const isUniqueValue = resp.data.isUnique
                console.log(typeof isUniqueValue, isUniqueValue)
                return isUniqueValue
              })
            return false
          }
        )
      },
      password: {
        required: helpers.withMessage('Обязательное поле', required),
        minLength: minLength(6)
      },
      confirmPassword: {
        required: helpers.withMessage('Обязательное поле', required),
        sameAs: sameAs(this.password)
      }
    }
  },
  methods: {
    register (e) {
      this.v$.$validate()
      if (this.v$.$errors.length === 0) {
        axios
          .post('/register', {
            data: { password: this.password, email: this.email }
          })
          .then((resp) => {
            if (resp.status === 200) this.$router.push('/login')
          })
          .catch((error) => {
            console.log('------------', error.response.data)
          })
      }
    }
  }
}
</script>
