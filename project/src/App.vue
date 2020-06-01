<template>
  <div>
    
    <!-- <router-link to='/'>home</router-link>
        <router-link to='/about'>about</router-link>
        <router-view/> -->




       <router-link to="/table">  <button class="btn btn-primary" >Table</button> </router-link>
      <router-link to="/Audio">  <button class="btn btn-primary" >Audio</button> </router-link>
        <router-link to="/Graph">  <button class="btn btn-primary" >Graph</button> </router-link>




      <router-view></router-view>


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
  name: "app",
  components: {
    DataTable,
    AudioVideoTest,
    GraphUsingD3
  },
  data: () => ({
   
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
