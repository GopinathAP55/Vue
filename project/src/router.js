import Vue from 'vue'
import Router from 'vue-router'
import DataTable from './components/DataTable'
import AudioVideoTest from './components/audioVideoTest'
import GraphUsingD3 from './components/GraphUsingD3'

Vue.use(Router)

export default new Router({
  mode: 'history',

  routes: [
    {
      path: '/table',
      name: 'table',
      component: DataTable
    },
    {
      path: '/Audio',
      name: 'audio',
      component: AudioVideoTest
    },
    {
      path: '/Graph',
      component: GraphUsingD3
    }

  ]
})
