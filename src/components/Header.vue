<template>
  <header>
    <article>
      <img src="../assets/logo.png" alt="logo" />
    </article>
    <nav>
      <a href="#">Сотрудники</a>
      <a href="#">Добавить</a>
      <a href="#">Смены</a>
      <a href="#">Заказы</a>
      <a href="#" class="cancel_button" @click="logout">Выход</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    async logout() {
      this.$router.push("/");
      await this.$store.dispatch(
        "logoutAsync",
        this.$store.getters.getToken
      );
    },
  },
};
</script>

<style>
</style>