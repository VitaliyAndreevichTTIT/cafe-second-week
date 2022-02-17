<template>
  <main>
    <NewEmployeeModal
      v-if="toggleModal"
      @cancelLogin="toggleModal = !toggleModal"
    />
    <NewShift v-if="toggleShit" @cancelShift="toggleShit = !toggleShit" />
    <header>
      <article>
        <img src="../assets/logo.png" alt="logo" />
      </article>
      <nav>
        <router-link to="/admin/employees">Сотрудники</router-link>
        <a href="#" @click.prevent="toggleModal = !toggleModal">Добавить</a>
        <a href="#" @click="toggleShit = !toggleShit">Смены</a>
         <router-link to="/admin/shifts">Заказы</router-link>
        <a href="#" class="cancel_button" @click="logout">Выйти</a>
      </nav>
    </header>
    <router-view></router-view>
    <!-- <Employees/> -->
    <section class="shift"></section>
    <section class="orders"></section>
  </main>
</template>

<script>
import NewEmployeeModal from "../components/NewEmployee.vue";
import NewShift from "../components/NewShift.vue";
// import Employees from "../components/Employees.vue";

export default {
  name: "Admin",
  data() {
    return {
      users: [],
      toggleModal: false,
      toggleShit: false,
    };
  },
  methods: {
    async logout() {
      this.$router.push("/");
      await this.$store.dispatch("logoutAsync", this.$store.getters.getToken);
    },
  },
  components: {
    NewEmployeeModal,
    NewShift,
    // Employees
  },
};
</script>

<style></style>
