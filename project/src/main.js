import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

Vue.use(bootstrap)
