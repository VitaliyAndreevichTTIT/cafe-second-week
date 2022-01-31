<template>
  <div class="cook">
    <header>
      <article>
        <img src="../assets/logo.png" alt="logo" />
      </article>
      <nav>
        <a href="#" class="cancel_button" @click.prevent="logout">Выйти</a>
      </nav>
    </header>
    <section class="employees">
      <article class="card">
        <div v-for="cook in undoneOrders" :key="cook.id">
          <span>Имя: </span>
          <span>{{ cook.table }}</span>
          <span>Статус: </span>
          <span class="working">{{ cook.status }}</span>
          <span>Должность: </span>
          <span>{{ cook.shift_workers }}</span>
          <button @click="changeStatus(cook)">Изменить</button>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
export default {
  name: "Cook",
  data() {
    return {
      cooks: [],
      convertStatusData: {
        preparing: "Готовится",
        ready: "Готово",
      },
    };
  },
  methods: {
    async changeStatus(cook) {
      const status = cook.status === "Принят" ? "preparing" : "ready";
      await this.$store.dispatch("changeStatusAsync", {
        id: cook.id,
        status,
        token: this.$store.getters.getToken,
      });

      await this.getOrders();
    },
    async getOrders() {
      const res = await this.$store.dispatch(
        "getCooksAsync",
        this.$store.getters.getToken || localStorage.myApiCafeToken
      );
      this.cooks = res;
    },
    async logout() {
      this.$router.push("/");
      const res = await this.$store.dispatch(
        "logoutAsync",
        this.$store.getters.getToken
      );
    },
  },
  computed: {
    undoneOrders() {
      return this.cooks.filter((cook) => cook.status !== "Готово");
    },
  },
  async mounted() {
    await this.getOrders();
  },
};
</script>
