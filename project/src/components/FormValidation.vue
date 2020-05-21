<template>
    <div>
        <form action="">
            <label for="">Name</label>
            <input type="text" required class="form-control" v-model="name">
             <label for="">age</label>
            <input type="text" required class="form-control" v-model="age">
            <button type="submit" class="btn btn-primary">submit</button>
        </form>
    </div>
</template>

<script>

export default {
    name:'FormValidation',
   data() {
       return {
           name:'',
           age:''
       }
      
   },
   
}
</script>

<style scoped>

</style>