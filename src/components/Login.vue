<template>
  <article class="modal">
    <form @submit.prevent="fetchLogin">
      <h2>Авторизация</h2>
      <div>
        <label for="login_enter">Логин</label>
        <input
          type="text"
          v-model="login"
          :placeholder="errors.login"
          name="login"
          id="login_enter"
        />
      </div>
      <div>
        <label for="password_enter">Пароль</label>
        <input
          type="password"
          v-model="password"
          :placeholder="errors.password"
          name="password"
          id="password_enter"
        />
      </div>
      <div>
        <button class="approve_button" type="submit">Отправить</button>
        <button class="cancel_button" @click.prevent="$emit('cancelLogin')">Отмена</button>
      </div>
    </form>
  </article>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      login: "",
      password: "",
      error: "field cannot be empty",
      errors: {
        login: "",
        password: ""
      }
    };
  },
  methods: {
    async fetchLogin() {
      if (!this.login || !this.password) {
        !this.login ? (this.errors.login = this.error) : "";
        !this.password ? (this.errors.password = this.error) : "";
        return;
      }
      const personData = {
        login: this.login,
        password: this.password
      };
      await this.$store.dispatch("fetchLoginAsync", personData);
      this.login = "";
      this.password = "";
      if (localStorage.myApiCafeToken) {
        if (personData.login === "cook") this.$router.push("/cook");
        else if (personData.login === "admin" || personData.login === "John1")
          this.$router.push("/admin/employees");
      }
    }
  }
};
</script>

<style scoped>
form input::placeholder {
  color: red;
}
</style>