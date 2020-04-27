<template>    
        <div>
          <HelloWorld v-bind:names1="name" v-on:del-name="deleteName"/>
          <AddName v-on:add-name="addName"/>

          

          </div>  
</template>

<script>
import HelloWorld from './components/HelloWorld'
import AddName from './components/Inputest'

export default {
  name : 'home',
  components :{
    HelloWorld,
    AddName
  },
   data: () => ({
     msg : 'Toolbar style',
     name : [
       { id : 1,
       name : 'gopi'
       },
       {
         id:2,
         name:'kavin'
       }
       ]
  }),
  methods :{
    deleteName(id){
      console.log('qw')
      this.name = this.name.filter( n => n.id!==id)
    },
    addName(newname){
      console.log(newname)
      this.name = [...this.name,newname]
    }
  }
}
</script>
