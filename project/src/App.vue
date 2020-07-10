<template>
  <div>
    
    <!-- <router-link to='/'>home</router-link>
        <router-link to='/about'>about</router-link>
        <router-view/> -->




       <router-link to="/Table">  <v-btn  class="btn btn-link">Table</v-btn> </router-link>
      <router-link to="/Audio">  <v-btn   class="btn btn-link">Audio</v-btn> </router-link>
        <router-link to="/Graph">  <v-btn  class="btn btn-link" >Graph</v-btn> </router-link>
                <router-link to="/Form">  <v-btn  class="btn btn-link" >Form</v-btn> </router-link>





      <router-view></router-view>
      <textarea v-model='gopi' name="gopi" id="" cols="30" rows="10"></textarea>
      <HelloWorld :names1='fromStorevalue'/>


  </div>
</template>

<script>
import $ from "jquery";
import FastSpeedtest from "fast-speedtest-api";
import AudioVideoTest from './components/audioVideoTest'
import HelloWorld from './components/HelloWorld'
import DataTable from './components/DataTable'
import FormValidation from './components/FormValidation'
import GraphUsingD3 from './components/GraphUsingD3'

export default {
  computed:{
    fromStorevalue(){
      return this.$store.state.name + this.$store.getters.myName
    }
  },
  name: "app",
  components: {
    DataTable,
    AudioVideoTest,
    GraphUsingD3,
    HelloWorld
  },
  data: () => ({
   gopi:'tested'

  }),
  message: "",
  methods: {
    

   
  }
};
</script>

<style scoped>
button {
  margin: 10px;
}
</style>
