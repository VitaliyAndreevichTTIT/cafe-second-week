<template>
  <section class="employees">
    <article class="card">
      <div v-for="shift in shifts" :key="shift.id">
        <span>Начало: </span><span>{{ shift.start }}</span> <span>Конец: </span
        ><span>{{ shift.end }}</span> 
        <button style="width: 9.3em" @click="activeShift(shift)">
          {{ !shift.active ? "Активировать" : "Деактивировать"}}
        </button>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "Shifts",
  methods: {
    async activeShift(shift) {
        (!shift.active)
          ? await this.$store.dispatch("openShiftAsync", shift.id)
          : await this.$store.dispatch("closeShiftAsync", shift.id);
    },
  },
  computed:{
    shifts(){
      return this.$store.getters.getShifts
    }
  },
  async mounted() {
    await this.$store.dispatch(
      "getShiftsAsync",
      this.$store.getters.getToken
    );
  },
};
</script>

<style>
</style>
