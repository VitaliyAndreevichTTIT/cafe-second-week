<template>
  <section class="employees">
    <article class="card">
      <div v-for="shift in $store.getters.getShifts" :key="shift.id">
        <span>Начало:</span>
        <span>{{ shift.start }}</span>
        <span>Конец:</span>
        <span>{{ shift.end }}</span>
        <span class="addEmmployeeToShift" v-if="shift.active" @click="addEmmployeeToShift(shift)">+</span>
        <button
          style="width: 9.3em"
          @click="activeShift(shift)"
        >{{ !shift.active ? "Активировать" : "Деактивировать"}}</button>
      </div>
    </article>
    <h2 class="errors" v-if="errors.length>0">{{errors[0]}}</h2>
    <EmployeeModal />
  </section>
</template>

<script>
import EmployeeModal from "./EmployeeModal.vue";

export default {
  name: "Shifts",
  data() {
    return {
      employeeModalOpen: true,
      errors: []
    };
  },
  methods: {
    async activeShift(shift) {
      const testShift = this.shifts.find(sh => sh.active);
      if (testShift === shift || !testShift) {
        !shift.active
          ? await this.$store.dispatch("openShiftAsync", shift.id)
          : await this.$store.dispatch("closeShiftAsync", shift.id);
      } else {
        this.errors.push("There is an open shift!");
      }
    },
    addEmmployeeToShift() {
      console.log( this.employeeModalOpen);
      
      this.employeeModalOpen = true;
    }
  },
  components: {
    EmployeeModal
  },
  watch: {
    errors() {
      setTimeout(() => (this.errors = []), 3000);
    }
  },
  async mounted() {
    await this.$store.dispatch("getShiftsAsync", this.$store.getters.getToken);
  }
};
</script>

<style scoped>
.errors {
  color: red;
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  position: absolute;
  width: 100%;
}
.addEmmployeeToShift {
  cursor: pointer;
}
</style>
