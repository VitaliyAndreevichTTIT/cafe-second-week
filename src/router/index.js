import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index.js"
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
},
{
    path: '/cook',
    name: 'Cook',
    component: function () {
        return import('../views/Cook.vue')
    },
}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// router.beforeEach((to, from, next) => {
//     if (!store.getters.getToken && from.path !== "/") next({ name: 'Home' })
//     else next()
// })

export default router