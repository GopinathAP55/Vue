<template>
<div > 
  <div v-bind:key="name.id" v-for="name in array" >
    <h1>{{name}}</h1>
    

  </div>
<button class="delete" @click="arrayValue()">Change </button>
  <h1>gopi value:{{ names1 }}</h1>
  <button style='margin-left:250px' id='but' @click="clickValue">Mutation</button>
      <h1>check</h1>
  <label   class="regular_checkbox_container" >check
                                <input v-model="checkbox" type="checkbox" checked >
  </label>




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
      checkbox:false,
      msg:'new message',
      array:['gop','gop1','gop2']
    }
  },
  watch:{
    checkbox(){
      console.log(this.checkbox)
    }
  },
  methods:{
    arrayValue(){
      this.array.forEach(a=>{
        a.style.backgroundColor='red'
      });
    },
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