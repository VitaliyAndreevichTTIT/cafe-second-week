<template>
  <article class="modal">
    <form
      name="employeeForm"
      enctype="multipart/form-data"
      type
      @submit.prevent="addDate"
    >
      <h2>Добавить смену</h2>
      <div>
        <label for="name_employee">Начало смены</label>
        <input
          type="date"
          :min="Date.now()"
          v-model="startShift"
          name="name"
          id="name_employee"
        />
        <input type="time" v-model="startShiftTime" />
      </div>
      <div>
        <label for="surname_employee">Конец смены</label>
        <input
          type="date"
          v-model="endShift"
          :min="startShift"
          name="surname"
          id="surname_employee"
        />
        <input type="time" v-model="endShiftTime" />
      </div>
      <div>
        <button class="approve_button" type="submit">Отправить</button>
        <button class="cancel_button" @click.prevent="$emit('cancelShift')">
          Отмена
        </button>
      </div>
    </form>
  </article>
</template>

<script>
export default {
  name: "NewShit",
  data() {
    return {
      startShift: "",
      endShift: "",
      startShiftTime: "",
      endShiftTime: "",
      errors: [],
    };
  },
  methods: {
    addDate() {
      if (
        !this.startShift &&
        !this.endShift &&
        !this.startShiftTime &&
        !this.endShiftTime
      )
        return;
    
      this.$store.dispatch("setShiftAsync", {
        start: this.startShift + " " + this.startShiftTime,
        end: this.endShift + " " + this.endShiftTime
      });
      this.$emit("cancelShift");
    },
  },
  mounted() {
    //       this.startShift = new Date(Date.now()).toString();
    //       console.log(this.startShift);
  },
};
</script>

<style></style>
