<template>
  <section class="employees">
    <article class="card">
      <div v-for="shift in shifts" :key="shift.id">
        <span>Начало: </span><span>{{ shift.start }}</span> <span>Конец: </span
        ><span>{{ shift.end }}</span> <span>Активна: </span
        ><span>{{ shift.active }}</span>
        <button style="width: 9.3em" @click="activeShift(shift)">
          {{ shift.active === 0 ? "Активировать" : "Деактивировать"}}
        </button>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "Shifts",
  data() {
    return {
      shifts: [],
    };
  },
  methods: {
    async activeShift(shift) {
        shift.active === 0
          ? await this.$store.dispatch("openShiftAsync", shift.id)
          : await this.$store.dispatch("closeShiftAsync", shift.id);
    },
  },
  async mounted() {
    this.shifts = await this.$store.dispatch(
      "getShiftsAsync",
      this.$store.getters.getToken
    );
  },
};
</script>

<style></style>
