<template>
  <article class="modal">
      <article class="card">
        <div v-for="eployee in $store.getters.getWorkingEmployees" :key="eployee.id">
          <span>Имя:</span>
          <span>{{ eployee.name }}</span>
          <span>Должность:</span>
          <span>{{ eployee.group }}</span>
          <button @click="setEmployyeToShift">Поставить на смену</button>
        </div>
      </article>
  </article>
</template>

<script>
export default {
  name: "EmployeeModal",
  data() {
    return {
      convertEmployeeStatus: {
        working: "Работает",
        fired: "Уволен"
      }
    };
  },
  methods: {
    setEmployyeToShift() {
      console.log("Set");
    }
  },
  async mounted() {
    await this.$store.dispatch("getUsersAsync", this.$store.getters.getToken);
  }
};
</script>

<style>
</style>