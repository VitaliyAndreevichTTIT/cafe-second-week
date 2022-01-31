<template>
  <main>
    <NewEmployeeModal v-if="toggleModal" @cancelLogin="toggleModal = !toggleModal"/>
    <header>
      <article>
        <img src="../assets/logo.png" alt="logo" />
      </article>
      <nav>
        <a href="#">Сотрудники</a>
        <a href="#" @click.prevent="toggleModal = !toggleModal">Добавить</a>
        <a href="#">Смены</a>
        <a href="#">Заказы</a>
        <a href="#" class="cancel_button" @click="logout">Выйти</a>
      </nav>
    </header>
    <section class="employees">
      <article class="card">
        <div v-for="user in users" :key="user.id">
          <span>Имя: </span><span>{{ user.name }}</span> <span>Статус: </span
          ><span :class="user.status">{{ convertEmployeeStatus[user.status] }}</span>
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
import NewEmployeeModal from "../components/NewEmployee.vue";

export default {
  name: "Admin",
  data() {
    return {
      users: [],
      toggleModal: false,
      convertEmployeeStatus:{
        working: "Работает",
        fired: "Уволен"
      }
    };
  },
  methods:{
    async logout(){
     this.$router.push("/");
      await this.$store.dispatch(
        "logoutAsync",
        this.$store.getters.getToken
      );
  }
  },
  components: { NewEmployeeModal },
  async mounted() {
    this.users = await this.$store.dispatch(
      "getUsersAsync",
      this.$store.getters.getToken
    );
  },
  
};
</script>

<style></style>
