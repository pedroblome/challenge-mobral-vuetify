import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Igor from '../views/Igor.vue'
import IgorNews from '../views/IgorNews.vue'
import Dieni from '../views/Dieni.vue'
import Eduardo from '../views/Eduardo.vue'
import JoaoPedro from '../views/JoaoPedro.vue'
import Iruan from '../views/Iruan.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/igor',
    name: 'Igor',
    component: Igor
  },
  {
    path: '/igornews',
    name: 'IgorNews',
    component: IgorNews
  },
  {
    path: '/dieni',
    name: 'Dieni',
    component: Dieni
  },
  {
    path: '/eduardo',
    name: 'Eduardo',
    component: Eduardo
  },
  {
    path: '/joaopedro',
    name: 'JoaoPedro',
    component: JoaoPedro
  },
  {
    path: '/iruan',
    name: 'Iruan',
    component: Iruan
  },
]

const router = new VueRouter({
  routes
})

export default router
