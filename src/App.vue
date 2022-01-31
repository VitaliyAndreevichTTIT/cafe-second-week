<template>
  <div id="app">
    <div class="wrapper">    
      <router-view />
      <Footer />
    </div>
  </div>
</template>

<script >
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

export default {
  name: "Home",
  components: {
    Footer,
    Header,
  },
};
</script>














<!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->