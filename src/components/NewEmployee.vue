<template>
  <article class="modal">
    <form
      name="employeeForm"
      enctype="multipart/form-data"
      type=""
      @submit.prevent="addEmployee"
    >
      <h2>Добавить сотрудника</h2>
      <div>
        <label for="name_employee">Имя</label>
        <input type="text" name="name" id="name_employee" />
      </div>
      <div>
        <label for="surname_employee">Фамилия</label>
        <input type="text" name="surname" id="surname_employee" />
      </div>
      <div>
        <label for="patronymic_employee">Отчество</label>
        <input type="text" name="patronymic" id="patronymic_employee" />
      </div>
      <div>
        <label for="login_employee">Логин</label>
        <input type="text" name="login" id="login_employee" />
      </div>
      <div>
        <label for="password_enter">Пароль</label>
        <input type="password" name="password" id="password_enter" />
      </div>
      <div>
        <label for="photo_file_employee">Логин</label>
        <input type="file" name="photo_file" id="photo_file_employee" />
      </div>
      <div>
        <label for="role_id_employee">Роль</label>
        <select name="role_id_employee">
          <option value="" disabled>Выберите роль</option>
          <option value="1">Администратор</option>
          <option value="2">Официант</option>
          <option value="3">Повар</option>
        </select>
      </div>
      <div>
        <button class="approve_button" type="submit">Отправить</button>
        <button class="cancel_button" @click.prevent="$emit('cancelLogin')">
          Отмена
        </button>
      </div>
    </form>
  </article>
</template>

<script>
export default {
  name: "NewEmployeeModal",
  methods: {
    async addEmployee() {
      this.$store.dispatch("setNewEmployeeAsync", employeeForm);
      employeeForm.reset();
      this.$emit('cancelLogin')
    },
  },
};
</script>

<style></style>
