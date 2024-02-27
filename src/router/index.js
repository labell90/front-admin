import { createRouter, createWebHistory } from 'vue-router'
import store from "../store/index.js"
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Imports routes
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import route_main from "@/router/routes/main.js";




const routes = [
    ...route_main
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
 routes
})

//Check Authenticate
router.beforeEach((to, from, next) => {
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (to.path !== '/login' && !store.getters.Modules_Authenticate_Getter_Check) {
        next('/login');
    }else if (to.path === '/login' && store.getters.Modules_Authenticate_Getter_Check){
        next('/');
    }
    else {
        next();
    }

});

export default router
