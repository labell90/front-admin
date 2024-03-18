//Axios Configs
import axios from "axios";
window.axios = axios;
let user_token = localStorage.getItem('auth_token')


window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL="http://labell.mehdi/api/users"
window.axios.defaults.headers.common['Authorization'] ="Bearer "+user_token


window.axios.interceptors.response.use(
    response => {

        return response; // Return the response or modify it before it's returned
    },
    error => {

        return Promise.reject(error);

    }
)