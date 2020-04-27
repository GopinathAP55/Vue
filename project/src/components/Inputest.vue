<template>
<div>
    <input type="text" v-model="name" placeholder="Add name"/>
    <button @click="addname">Add</button>
</div>

</template>


<script>
export default {
    name:"AddingName",
    data :()=>({
        name:''
    }),
    methods:{
        addname(){
            const newName ={
                id:1,
                name:this.name
            }
            this.$emit('add-name',newName)
             this.name=''
        }
       
    }
}
</script>