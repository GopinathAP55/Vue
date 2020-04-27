<template>
<div > 
  <div v-bind:key="name.id" v-for="name in names1" >
    <h1>{{name.name}}</h1>
    <button class="delete" @click="$emit('del-name', name.id)">Delete </button>

  </div>
</div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props:["names1"]

}
</script>

<style scoped>
.delete {
color:  red;
}
</style>