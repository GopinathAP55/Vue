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

      

           
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      
      
               </v-dialog>
  
    </div>


    
</template>

<script>

import moment from 'moment'
import { bus } from '../main'
export default {
    name:'FormValidation',
    created (){
        console.log('created')
         bus.$on("returnValue", this.returnValue);
    },
    mounted(){
         console.log('mounted')
    },
    computed(){
     console.log('computed')
    },
   data() {
       return {
           name:'',
           age:'',
           dialog:false
       }
      
   },
   methods :{
       returnValue(val){
           console.log('re')
           console.log(`return val:${val}`)
       },
       dateCheck(){
           this.dialog = !this.dialog

          bus.$emit('emitTest','header')
           var current = moment()
         var currentDate = moment()
         
           current.subtract(10,'days')
                      currentDate.subtract(11,'days')

        //    console.log(current)
        //    console.log(current.isAfter(currentDate))
        //   console.log(current.isBefore(new Date()))

        // console.log(`MATH:${Math.abs(new Date() - new Date('6/10/2020'))}`)  


        var numbers = new Array()
        numbers.push(new Array(50,5))
        numbers.push(new Array(150,151))
        numbers.push(new Array(1500,1501))


var newarray = numbers.map(function(obj){
    if(obj[0]>150){
      //  console.log('<150')
    }else{
       // console.log('>150')
    }
//    console.log((500/1000).toFixed(2))
//     console.log((1000/1000))
//         console.log(Math.floor(450/1000))


})

function myFunction(num) {
  return num * 10;
}



       }

   }
   
}
</script>

<style scoped>

</style>