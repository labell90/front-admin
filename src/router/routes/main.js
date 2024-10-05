//Main (public) routes

import HomeView from "@/views/HomeView.vue";
import Auth_Login from "@/views/auth/Auth_Login.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";



const route_main = [
    {
        path: '/',
        name: 'home',
        component: Dashboard,
        meta : {
            title : 'داشبورد',
            subtitle : ''
        },
    },
    {
        path : '/login',
        name : 'auth_login',
        component : Auth_Login
    }


]

export default route_main;