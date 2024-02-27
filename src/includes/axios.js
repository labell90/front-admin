//Axios Configs
import axios from "axios";
window.axios = axios;



window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL="http://localhost:8000/users/"

window.axios.interceptors.response.use(
    response => {

        return response; // Return the response or modify it before it's returned
    },
    error => {

        return Promise.reject(error);

    }
)