<template>
  <section class="employees">
    <article class="card">
      <div v-for="eployee in $store.getters.getEmployees" :key="eployee.id">
        <span>Имя: </span><span>{{ eployee.name }}</span> <span>Статус: </span
        ><span :class="eployee.status">{{
          convertEmployeeStatus[eployee.status]
        }}</span>
        <span>Должность: </span><span>{{ eployee.group }}</span>
        <button>Подробнее</button>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "Employees",
  data() {
    return {
      convertEmployeeStatus: {
        working: "Работает",
        fired: "Уволен",
      },
    };
  },
  async mounted() {
    await this.$store.dispatch(
      "getUsersAsync",
      this.$store.getters.getToken
    );
  },
};
</script>

<style></style>
