<template>
   <article class="modal">
    <form @submit.prevent="">
      <h2>ИмяФамилияОтчество</h2>
      <div>
       <span>Статус:</span>
       <span>Статус</span>
      </div>
      <div>
          <div style="width:100px; height: 100px; background: black">Photo</div>
          <span>Фото</span>
      </div>
      <div>
        <button class="approve_button" type="submit">Отправить</button>
        <button class="cancel_button" @click.prevent="$emit('cancelLogin')">Отмена</button>
      </div>
    </form>
  </article>
</template>

<script>
export default {

}
</script>

<style>

</style>