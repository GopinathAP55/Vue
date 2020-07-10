import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state:{
        name:'Tendulkar',
        secondName:'sachin'
    },
    getters:{
        myName:state=>{
            return state.secondName
        }
    },
    mutations :{
        setName(state,value){
            state.name = value
        }
    }
})