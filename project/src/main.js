import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css'
import router from "./router";



new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')



Vue.use(bootstrap)
Vue.use(p5)

Vue.config.productionTip = false