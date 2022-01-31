<template>
  <div class="cook">
    <h1>Повар</h1>
    <button class="btn approve_button" @click="logout">Выйти</button>
    <ul>
      <li v-for="cook in undoneOrders" :key="cook.id">
        {{ cook.table }} - {{ cook.status }} - {{ cook.price }} -
        {{ cook.shift_workers }} - {{ cook.create_at }} -
        <button @click="changeStatus(cook)">Change</button>
      </li>
    </ul>
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
      
       const status = cook.status === "Принят" ?  "preparing" : "ready";
       await this.$store.dispatch("changeStatus", {
              id: cook.id,
              status,
              token: this.$store.getters.getToken,
            })
          
      await this.getOrders();
    },
    async getOrders() {
      const res = await this.$store.dispatch(
        "getCooks",
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

<style>
.btn {
  cursor: pointer;
  width: 5rem;
  height: 2rem;
  border-radius: 5px;
}

.cook {
  width: min(700px, 90%);
  margin: 20px auto;
}
</style>