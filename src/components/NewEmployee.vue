<template>
<article class="modal">
  <form name="employeeForm" enctype="multipart/form-data" type="" @submit.prevent="addEmployee">
    <h2>Добавить сотрудника</h2>
    <div>
      <label for="name_employee">Имя</label>
      <input type="text" v-model="name" name="name" id="name_employee" />
    </div>
    <div>
      <label for="surname_employee">Фамилия</label>
      <input
        type="text"
        v-model="surname"
        name="surname"
        id="surname_employee"
      />
    </div>
    <div>
      <label for="patronymic_employee">Отчество</label>
      <input
        type="text"
        v-model="patronymic"
        name="patronymic"
        id="patronymic_employee"
      />
    </div>
    <div>
      <label for="login_employee">Логин</label>
      <input
        type="text"
        v-model="login"
        name="login"
        id="login_employee"
      />
    </div>
    <div>
      <label for="password_enter">Пароль</label>
      <input
        type="password"
        v-model="password"
        name="password"
        id="password_enter"
      />
    </div>
    <div>
      <label for="photo_file_employee">Логин</label>
      <input type="file" name="photo_file" id="photo_file_employee" />
    </div>
    <div>
      <label for="role_id_employee">ID роли</label>
      <input
        type="text"
        v-model.number="role_id"
        name="role_id"
        id="role_id_employee"
      />
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
    name:'NewEmployeeModal',
    data(){
        return{
            name : '',
            surname  : '',
            patronymic  : '',
            login  : '',
            password  : '',
            role_id  : ''
        }
    },
    methods:{
        async addEmployee(){
            console.log('Add new Employee', employeeForm);
            this.$store.dispatch('setNewEmployeeAsync', employeeForm)
        }
    }
};
</script>

<style></style>
