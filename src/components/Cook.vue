<template>
  <div class="cook">
      <h1>Повар</h1>
      <button class="btn approve_button" @click="logout">Выйти</button>
    <ul>
      <li v-for="(cook, index) in cooks" :key="cook.id">
        {{ cook.table }} - {{ cook.status }} - {{ cook.price }} -
        {{ cook.shift_workers }} - {{ cook.create_at }} -
        <button @click="changeStatus(cook.id, index)">Change</button>
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
    async changeStatus(id, index) {
      const cook = this.cooks[index];
      const result =
        cook.status === "Принят"
          ? await this.$store.dispatch("changeStatus", {
              id,
              status: "preparing",
              token: this.$store.getters.getToken,
            })
          : await this.$store.dispatch("changeStatus", {
              id,
              status: "ready",
              token: this.$store.getters.getToken,
            });
      this.cooks[index].status = this.convertStatusData[result.status];
    },
    async logout(){
        this.$router.push('/')
        const res = await this.$store.dispatch('logoutAsync', this.$store.getters.getToken)
    }
  },
  async mounted() {
    const res = await this.$store.dispatch(
      "getCooks",
      this.$store.getters.getToken
    );
    this.cooks = res;
  },
};
</script>

<style>
.btn{
    cursor: pointer;
    width: 5rem;
    height: 2rem;
    border-radius: 5px;
}

.cook{
    width: min(700px, 90%);
    margin:20px auto;
}
</style>