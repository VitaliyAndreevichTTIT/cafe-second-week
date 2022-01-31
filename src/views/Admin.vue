<template>
  <main>
    <Header />
    <section class="employees">
      <article class="card">
        <div v-for="user in users" :key="user.id">
          <span>Имя: </span><span>{{ user.name }}</span> <span>Статус: </span
          ><span :class="user.status">{{ user.status }}</span>
          <span>Должность: </span><span>{{ user.group }}</span>
          <button>Подробнее</button>
        </div>
      </article>
    </section>
    <section class="shift"></section>
    <section class="orders"></section>
  </main>
</template>

<script>
import Header from "../components/Header.vue";

export default {
  name: "Admin",
  data() {
    return {
      users: [],
    };
  },
  components: {Header},
  async mounted() {
    this.users = await this.$store.dispatch(
      "getUsersAsync",
      this.$store.getters.getToken
    );
  },
};
</script>

<style>
</style>