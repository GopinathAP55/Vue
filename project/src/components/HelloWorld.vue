<template>
<div > 
  <!-- <div v-bind:key="name.id" v-for="name in names1" >
    <h1>{{name.name}}</h1>
    <button class="delete" @click="$emit('del-name', name.id)">Delete </button>

  </div> -->

  <h1>gopi</h1>
  <button @click="clickValue=true"></button>



</div>

</template>

<script>
export default {
  name: 'HelloWorld',
  props:["names1"],
  data() {
    return {
      msg:'new message',
      clickValue:false
    }
  }

}
</script>

<style scoped>
.delete {
color:  red;
}




.title.testrtc-suite {
    margin-left: 0;
}

.header.testrtc-suite {
    cursor: pointer;
    font-size: 1.3em;
}
</style>