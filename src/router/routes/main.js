//Main (public) routes

import HomeView from "@/views/HomeView.vue";
import Auth_Login from "@/views/auth/Auth_Login.vue";



const route_main = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
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