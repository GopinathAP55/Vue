<template>
<div > 
  <!-- <div v-bind:key="name.id" v-for="name in names1" >
    <h1>{{name.name}}</h1>
    <button class="delete" @click="$emit('del-name', name.id)">Delete </button>

  </div> -->

  <h1>gopi value:{{ names1 }}</h1>
  <button style='margin-left:250px' id='but' @click="clickValue">Mutation</button>



</div>

</template>

<script>
export default {
    computed:{
    fromStorevalue(){
      return this.$store.state.name + this.$store.getters.myName
    }
  },
  name: 'HelloWorld',
  props:["names1"],
  data() {
    return {
      msg:'new message',
    }
  },
  methods:{
    clickValue(){
      this.$store.commit('setName','gopi')
      console.log(this.fromStorevalue)
      document.getElementById('but').style.marginLeft=100+'px'
    let margin,margin2

      margin = {top:20}
       margin.top=40

       margin2 = {top:20}
       console.log(margin.top)
       console.log(margin2.top)
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