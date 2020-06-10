<template>
    <div>
        <form action="">
            <label for="">Name</label>
            <input type="text" required class="form-control" v-model="name">
             <label for="">age</label>
            <input type="text" required class="form-control" v-model="age">
            <button type="submit" class="btn btn-primary">submit</button>
        </form>

        <button @click='dateCheck' class="btn btn-danger">Date check</button>
    </div>
</template>

<script>

import moment from 'moment'
export default {
    name:'FormValidation',
   data() {
       return {
           name:'',
           age:''
       }
      
   },
   methods :{
       dateCheck(){
           var current = moment()
         var currentDate = moment()
         
           current.subtract(10,'days')
                      currentDate.subtract(11,'days')

           console.log(current)
           console.log(current.isAfter(currentDate))
          console.log(current.isBefore(new Date()))


       }

   }
   
}
</script>

<style scoped>

</style>