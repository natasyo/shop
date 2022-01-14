<template>
  <div class="signUp">
    <div class="container signUp__container">
      <div class="signUp__form form">
        <h2>Регистраци</h2>
        <div class="form__field">
          <label for="email" class="form__label">Email</label>
          <input
            type="email"
            id="email"
            class="form__text"
            placeholder="example@email.ru"
          />
        </div>
        <div class="form__field">
          <label for="password" class="form__label">Пароль</label>
          <input
            type="password"
            id="password"
            class="form__text"
            placeholder="пароль"
          />
        </div>
        <div class="form__field">
          <label for="passwordRepeat" class="form__label"
            >Повторите пароль</label
          >
          <input
            type="password"
            id="passwordRepeat"
            class="form__text"
            placeholder="пароль"
          />
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
export default {
  methods: {
    register (e) {
      console.log(e)
    }
  }
}
</script>
