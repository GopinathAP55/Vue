import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.css'
import router from "./router";
import { store } from "./store/store"
import VueDarkMode from "@growthbunker/vuedarkmode";

Vue.use(VueDarkMode);

export const bus = new Vue()

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


Vue.use(bootstrap)

Vue.config.productionTip = false