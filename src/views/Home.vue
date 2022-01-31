<template>
  <div>
    <Modal v-if="modalOpen" @cancelLogin="modalOpen = !modalOpen"></Modal>
    <header>
      <article>
        <img src="../assets/logo.png" alt="logo" />
      </article>
      <nav>
        <a href="#" class="approve_button" @click.prevent="openModal">Вход</a>
      </nav>
    </header>
    <main></main>
  </div>
</template>

<script>
import Modal from "../components/Login.vue";
import Footer from "../components/Footer.vue";
export default {
  name: "Home",
  components: {
    Modal,
    Footer,
  },
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.modalOpen = !this.modalOpen;
    },
  },
};
</script>
